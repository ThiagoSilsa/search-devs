import { Button, Flex, Input, InputGroup } from '@chakra-ui/react'
import { FiSearch } from 'react-icons/fi'

const SearchBar = ({ searchTerm, errorMessage, setSearchTerm, handleSearch, t, setErrorMessage }) => {
    return (
        <Flex direction={{ base: 'column', md: 'row' }} gap={2}>
            <InputGroup startElement={<FiSearch size={22} />}>
                <Input
                    required={true}
                    placeholder={t('homePage.searchPlaceholder')}
                    size="lg"
                    borderColor="var(--border-color)"
                    value={searchTerm}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch()
                        }
                    }}
                    onChange={(e) => {
                        setSearchTerm(e.target.value)
                        if (errorMessage) setErrorMessage('')
                    }}
                    _focus={{
                        borderColor: 'var(--primary-color)',
                        boxShadow: '0 0 0 1px var(--primary-color)',
                    }}
                    color={'var(--font-color1)'}
                />
            </InputGroup>
            <Button
                onClick={handleSearch}
                size="md"
                w={{ base: 'full', md: 'auto' }}
                bg="var(--primary-color)"
                color={'white'}
                _hover={{
                    bg: 'var(--primary-color-hover)',
                    transition: 'background-color 0.3s',
                }}
                padding={'2px 55px'}
            >
                {t('common.search')}
            </Button>
        </Flex>
    )
}

export default SearchBar
