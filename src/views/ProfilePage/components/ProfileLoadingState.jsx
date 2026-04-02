import { Container, Spinner, Text, VStack } from '@chakra-ui/react'

const ProfileLoadingState = ({ t }) => {
    return (
        <Container minW="100vw" minH="100vh" display="flex" alignItems="center" justifyContent="center" bg="white">
            <VStack gap={4}>
                <Spinner size="xl" color="var(--primary-color)" />
                <Text color="var(--font-color1)">{t('profilePage.loading.profile')}</Text>
            </VStack>
        </Container>
    )
}

export default ProfileLoadingState
