import {ItemMacroType, ItemType} from "./enums";

export const ErrorMessage = {
    "auth/user-not-found": 'Utente inesistente o password errata'
}

export const itemTypeLabel = type => {
    switch (type) {
        case ItemType.TYPE_WEAPON:
            return "Arma"
        case ItemType.TYPE_ARMOR_SHIELD:
            return "Armatura/Scudo"
        case ItemType.TYPE_DRESS:
            return "Vestito"
        case ItemType.TYPE_ST_TOOL:
            return "ST TOOL"
        case ItemType.TYPE_CRAFT_TOOL:
            return "CRAFT TOOL"
        case ItemType.TYPE_RESOURCE:
            return "Risorsa"
        case ItemType.TYPE_SINGLE_USE:
            return "Consumabile"
        case ItemType.TYPE_TRANSPORT:
            return "TRANSPORT"
        case ItemType.TYPE_OTHER:
            return "Altro"
        default:
            return type
    }
}

export const itemMacroTypeLabel = type => {
    switch (type) {
        case ItemMacroType.BUILDING:
            return "Costruzione"
        case ItemMacroType.TERRAIN:
            return "Terreno"
        case ItemMacroType.TOOL:
            return "Strumento"
    }
}