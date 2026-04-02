import { Link as RouterLink } from 'react-router-dom'
import { Button, Container, Text, VStack } from '@chakra-ui/react'

const ProfileErrorState = ({ errorMessage, isUserNotFound, username, t }) => {
    return (
        <Container minW="100vw" minH="100vh" display="flex" alignItems="center" justifyContent="center" bg="white">
            <VStack gap={4}>
                <Text color="red.500">{errorMessage || t('profilePage.errors.profileFallback')}</Text>
                {isUserNotFound && (
                    <Text color="var(--font-color2)" whiteSpace="wrap" wordBreak="break-word">
                        {t('profilePage.errors.userDoesNotExist', { username })}
                    </Text>
                )}
                <Button as={RouterLink} to="/" bg="var(--primary-color)" color="white" _hover={{ bg: 'var(--primary-color-hover)' }}>
                    {t('common.back')}
                </Button>
            </VStack>
        </Container>
    )
}

export default ProfileErrorState
