function setPropertys() {
    const value = {
        diaryDbId: 'xxxxxx',
        token: 'xxxxx',
        spreadSheetId: 'xxxxxx',
    }

    PropertiesService.getScriptProperties().setProperties(value)
}
