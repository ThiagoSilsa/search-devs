import { Box, Flex, Heading, HStack, Icon, Link, NativeSelect, Spinner, Text, VStack } from '@chakra-ui/react'

import { IoEyeOutline, IoStarOutline } from 'react-icons/io5'
import { LuDot } from 'react-icons/lu'
import { FiMoreHorizontal } from 'react-icons/fi'

import getDayQuantityText from '../../../utils/getComparedDate'

const RepositoriesSection = ({
    repositories,
    loadingRepos,
    hasMoreRepositories,
    sortType,
    sortDirection,
    setSortType,
    setSortDirection,
    t,
}) => {
    return (
        <Box flex="1" w="full">
            <Flex direction={{ base: 'column', md: 'row' }} gap={2} justify={'space-between'}>
                <Heading as="h2" size="lg" color="var(--font-color1)" mb={4}>
                    {t('profilePage.title')}
                </Heading>
                <HStack spacing={3}>
                    <NativeSelect.Root
                        value={sortType}
                        onChange={(e) => setSortType(e.target.value)}
                        w="150px"
                        bg="white"
                        color={'var(--font-color2)'}
                    >
                        <NativeSelect.Field>
                            <option value="updated">{t('profilePage.sort.updated')}</option>
                            <option value="created">{t('profilePage.sort.created')}</option>
                            <option value="pushed">{t('profilePage.sort.pushed')}</option>
                            <option value="full_name">{t('profilePage.sort.fullName')}</option>
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                    </NativeSelect.Root>
                    <NativeSelect.Root
                        value={sortDirection}
                        onChange={(e) => setSortDirection(e.target.value)}
                        w="120px"
                        bg="white"
                        color={'var(--font-color2)'}
                    >
                        <NativeSelect.Field>
                            <option value="asc">{t('profilePage.sort.asc')}</option>
                            <option value="desc">{t('profilePage.sort.desc')}</option>
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                    </NativeSelect.Root>
                </HStack>
            </Flex>

            {repositories.length === 0 && <Text color="var(--font-color2)">{t('profilePage.states.noRepositories')}</Text>}

            <VStack align="stretch" gap={3}>
                {loadingRepos ? (
                    <HStack justify="center" py={6}>
                        <Spinner size="lg" color="var(--primary-color)" />
                        <Text color="var(--font-color2)">{t('profilePage.loading.repositories')}</Text>
                    </HStack>
                ) : (
                    repositories.map((repository) => (
                        <Box key={repository.id} border="1px solid var(--border-color)" borderRadius="md" p={4}>
                            <HStack justify="space-between" align="flex-start" gap={4}>
                                <VStack align="stretch" gap={1} flex="1">
                                    <Link
                                        href={repository.html_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        color="var(--secondary-color)"
                                        fontWeight="700"
                                    >
                                        {repository.name}
                                    </Link>
                                    {repository.description && (
                                        <Text color="var(--font-color2)" fontSize="sm">
                                            {repository.description}
                                        </Text>
                                    )}
                                </VStack>
                                <Text color="var(--font-color2)" fontSize="sm" whiteSpace="nowrap">
                                    {repository.language || t('profilePage.fallback.language')}
                                </Text>
                            </HStack>
                            <HStack mt={2} spacing={4}>
                                <HStack spacing={1}>
                                    <IoStarOutline color={'var(--font-color2)'} size={16} />
                                    <Text color="var(--font-color2)" fontSize="sm">
                                        {repository.stargazers_count}
                                    </Text>
                                </HStack>
                                <HStack spacing={1}>
                                    <IoEyeOutline color={'var(--font-color2)'} size={16} />
                                    <Text color="var(--font-color2)" fontSize="sm">
                                        {repository.watchers_count}
                                    </Text>
                                </HStack>
                                <HStack spacing={1}>
                                    <LuDot color={'var(--font-color2)'} size={16} />
                                    <Text color="var(--font-color2)" fontSize="sm">
                                        {repository.updated_at
                                            ? t('profilePage.updatedWithDate', { value: getDayQuantityText(repository.updated_at) })
                                            : t('profilePage.fallback.noUpdateDate')}
                                    </Text>
                                </HStack>
                            </HStack>
                        </Box>
                    ))
                )}
            </VStack>

            <VStack mt={6}>
                {hasMoreRepositories && <Icon as={FiMoreHorizontal} boxSize={7} color="var(--font-color2)" />}
                {!hasMoreRepositories && repositories.length > 0 && (
                    <Text color="var(--font-color2)" fontSize="sm">
                        {t('profilePage.states.noMoreRepositories')}
                    </Text>
                )}
            </VStack>
        </Box>
    )
}

export default RepositoriesSection
