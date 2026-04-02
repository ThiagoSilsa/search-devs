import { Box, Button, Heading, HStack, Text, VStack } from '@chakra-ui/react'

import { HiOutlineUserGroup } from 'react-icons/hi'
import { CiHeart, CiMail } from 'react-icons/ci'
import { IoLocationOutline } from 'react-icons/io5'
import { FiLink } from 'react-icons/fi'
import { BsBuilding } from 'react-icons/bs'

const ProfileSidebar = ({ user, t }) => {
    return (
        <Box
            w={{ base: 'full', md: '320px' }}
            border="1px solid var(--border-color)"
            borderRadius="md"
            p={6}
            position={{ base: 'static', md: 'sticky' }}
            top={6}
        >
            <VStack align="stretch" gap={4}>
                <HStack align="center">
                    <Box as="img" src={user.avatar_url} alt={user.login} borderRadius="full" w="55px" />
                    <VStack gap={1} align={'flex-start'}>
                        <Heading as="h1" size="md" color="var(--font-color1)">
                            {user.name || user.login}
                        </Heading>
                        <Text fontSize={'sm'} color="var(--font-color3)">@{user.login}</Text>
                    </VStack>
                </HStack>
                {user.bio && <Text color="var(--font-color2)">{user.bio}</Text>}

                <VStack align="flex-start" gap={1}>
                    <HStack justify="space-between">
                        <HiOutlineUserGroup color={'var(--font-color2)'} size={20} />
                        <Text color="var(--font-color2)">{t('profilePage.stats.followers', { count: user?.followers || 0 })}</Text>
                    </HStack>
                    <HStack justify="space-between">
                        <CiHeart color={'var(--font-color2)'} size={20} />
                        <Text color="var(--font-color2)">{t('profilePage.stats.following', { count: user?.following || 0 })}</Text>
                    </HStack>
                </VStack>

                <VStack align="flex-start" gap={2} marginTop={4}>
                    <HStack justify="space-between">
                        <BsBuilding color={'var(--font-color2)'} size={20} />
                        <Text color="var(--font-color2)">{user?.company || t('profilePage.fallback.company')}</Text>
                    </HStack>
                    <HStack justify="space-between">
                        <IoLocationOutline color={'var(--font-color2)'} size={20} />
                        <Text color="var(--font-color2)">{user?.location || t('profilePage.fallback.location')}</Text>
                    </HStack>
                    <HStack justify="space-between">
                        <FiLink color={'var(--font-color2)'} size={20} />
                        <Text color="var(--font-color2)" whiteSpace="wrap" wordBreak="break-word">
                            {user?.blog || t('profilePage.fallback.website')}
                        </Text>
                    </HStack>
                    <HStack justify="space-between">
                        <CiMail color={'var(--font-color2)'} size={20} />
                        <Text color="var(--font-color2)" whiteSpace="wrap" wordBreak="break-word">
                            {user?.email || t('profilePage.fallback.email')}
                        </Text>
                    </HStack>
                </VStack>
            </VStack>

            <VStack marginTop={10}>
                {user?.blog && (
                    <Button
                        as="a"
                        href={user?.blog}
                        target="_blank"
                        rel="noreferrer"
                        size="md"
                        bg="var(--primary-color)"
                        color={'white'}
                        _hover={{
                            bg: 'var(--primary-color-hover)',
                            transition: 'background-color 0.3s',
                        }}
                        padding={'2px 55px'}
                        w={'full'}
                    >
                        {t('common.contact')}
                    </Button>
                )}
                {user?.twitter_username && (
                    <Button
                        as="a"
                        href={`https://x.com/${user?.twitter_username}`}
                        target="_blank"
                        rel="noreferrer"
                        size="md"
                        bg="var(--primary-color)"
                        color={'white'}
                        _hover={{
                            bg: 'var(--primary-color-hover)',
                            transition: 'background-color 0.3s',
                        }}
                        padding={'2px 55px'}
                        w={'full'}
                    >
                        {t('common.twitter')}
                    </Button>
                )}
            </VStack>
        </Box>
    )
}

export default ProfileSidebar
