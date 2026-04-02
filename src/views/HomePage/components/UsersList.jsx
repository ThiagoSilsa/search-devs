import { Link as RouterLink } from 'react-router-dom'
import { Box, Button, HStack, Spinner, Text, VStack } from '@chakra-ui/react'

const UsersList = ({ isLoading, users, t }) => {
    if (isLoading) {
        return (
            <VStack gap={4}>
                <Spinner size="xl" color="var(--primary-color)" />
                <Text color="var(--font-color1)">{t('profilePage.loading.profile')}</Text>
            </VStack>
        )
    }

    if (users.length === 0) {
        return null
    }

    return (
        <VStack align="stretch" spacing={3} mt={2}>
            {users.map((user) => (
                <Box
                    key={user.id}
                    display="flex"
                    flexFlow={{ base: 'column', md: 'row' }}
                    alignItems="center"
                    justifyContent="space-between"
                    border="1px solid var(--border-color)"
                    borderRadius="md"
                    p={3}
                >
                    <HStack spacing={3} alignSelf={'flex-start'}>
                        <Box
                            as="img"
                            src={user.avatar_url}
                            alt={user.login}
                            w="40px"
                            h="40px"
                            borderRadius="full"
                        />
                        <Text color="var(--font-color1)" fontWeight="600">
                            {user.login}
                        </Text>
                    </HStack>
                    <Button
                        alignSelf={'flex-end'}
                        as={RouterLink}
                        to={`/profile/${user.login}`}
                        size="sm"
                        bg="var(--primary-color)"
                        color="white"
                        _hover={{ bg: 'var(--primary-color-hover)' }}
                    >
                        {t('common.view')}
                    </Button>
                </Box>
            ))}
        </VStack>
    )
}

export default UsersList
