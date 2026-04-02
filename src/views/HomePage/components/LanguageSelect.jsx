import { Flex, Portal, Select, Text, createListCollection } from '@chakra-ui/react'

const LanguageSelect = ({ t, i18n }) => {
    const currentLanguage = i18n.language.startsWith('pt') ? 'pt' : 'en'

    const languageCollection = createListCollection({
        items: [
            { label: t('common.english'), value: 'en' },
            { label: t('common.portuguese'), value: 'pt' },
        ],
    })

    return (
        <Flex position="absolute" gap={2} top={4} right={10} direction={{ base: 'column', md: 'row' }} align={{ base: 'flex-start', md: 'center' }} justify="center">
            <Text color="var(--font-color2)" fontSize="sm">
                {t('common.language')}
            </Text>
            <Select.Root
                collection={languageCollection}
                value={[currentLanguage]}
                onValueChange={({ value }) => i18n.changeLanguage(value[0] || 'en')}
                w="140px"
            >
                <Select.HiddenSelect />
                <Select.Control>
                    <Select.Trigger bg="white" color="var(--font-color2)" border="1px solid var(--border-color)">
                        <Select.ValueText placeholder={t('common.english')} />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                        <Select.Indicator color="var(--font-color2)" />
                    </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                    <Select.Positioner>
                        <Select.Content bg="white" color="black" border="1px solid var(--border-color)">
                            {languageCollection.items.map((item) => (
                                <Select.Item key={item.value} item={item} color="black" _highlighted={{ bg: '#f5f5f5' }}>
                                    <Select.ItemText>{item.label}</Select.ItemText>
                                </Select.Item>
                            ))}
                        </Select.Content>
                    </Select.Positioner>
                </Portal>
            </Select.Root>
        </Flex>
    )
}

export default LanguageSelect
