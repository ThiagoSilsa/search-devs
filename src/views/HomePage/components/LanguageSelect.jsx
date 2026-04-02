import { Flex, HStack, NativeSelect, Text } from '@chakra-ui/react'

const LanguageSelect = ({ t, i18n }) => {
    return (
        <Flex position="absolute" gap={2} top={4} right={10} spacing={2} direction={{ base: "column", md: "row" }} align={{ base: "flex-start", md: "center" }} justify="center">
            <Text color="var(--font-color2)" fontSize="sm">
                {t('common.language')}
            </Text>
            <NativeSelect.Root
                value={i18n.language.startsWith('pt') ? 'pt' : 'en'}
                onChange={(e) => i18n.changeLanguage(e.target.value)}
                w="140px"
                bg="white"
                color="var(--font-color2)"
            >
                <NativeSelect.Field>
                    <option value="en">{t('common.english')}</option>
                    <option value="pt">{t('common.portuguese')}</option>
                </NativeSelect.Field>
                <NativeSelect.Indicator />
            </NativeSelect.Root>
        </Flex>
    )
}

export default LanguageSelect
