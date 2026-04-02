import { createListCollection } from "@chakra-ui/react"
import { t } from "i18next"

    const sortTypeCollection = createListCollection({
        items: [
            { label: t('profilePage.sort.updated'), value: 'updated' },
            { label: t('profilePage.sort.created'), value: 'created' },
            { label: t('profilePage.sort.pushed'), value: 'pushed' },
            { label: t('profilePage.sort.fullName'), value: 'full_name' },
        ],
    })

    const sortDirectionCollection = createListCollection({
        items: [
            { label: t('profilePage.sort.asc'), value: 'asc' },
            { label: t('profilePage.sort.desc'), value: 'desc' },
        ],
    })

export { sortTypeCollection, sortDirectionCollection }