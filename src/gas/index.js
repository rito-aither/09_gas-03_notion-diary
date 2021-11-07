// Create a common header object for Notion API
const notionHeader = (token) => ({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
    'Notion-Version': '2021-08-16',
})

// Create a diary page for the given date
const createDiaryPage = (dbId, date, token) => {
    const url = `https://api.notion.com/v1/pages`
    const jaToday = date.toLocaleDateString('ja-JP', { timeZone: 'Asia/Tokyo' }) // e.g. 2021/7/3
    const jaDate = jaToday.split('/')
    const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][
        date.getDay()
    ]

    const children = createDiaryPageContentList(getContentListFromSpreadsheet())

    const body = {
        parent: {
            database_id: dbId,
        },
        // タイトル
        properties: {
            Name: {
                title: [
                    {
                        text: {
                            content: `${jaToday}(${dayOfWeek})`,
                        },
                    },
                ],
            },
        },
        // 内容
        children: children,
    }
    const options = {
        method: 'post',
        headers: notionHeader(token),
        payload: JSON.stringify(body),
    }
    const resp = UrlFetchApp.fetch(url, options)
    return JSON.parse(resp.getContentText())
}

// 内容の目次をspreadsheetから取得
const getContentListFromSpreadsheet = () => {
    const spreadsheet = SpreadsheetApp.openById(
        PropertiesService.getScriptProperties().getProperty('spreadSheetId')
    )
    const sheet = spreadsheet.getSheetByName('目次')

    const contentList = sheet
        .getRange(
            2, //2行目から取得
            1,
            sheet.getLastRow() - 1,
            sheet.getLastColumn()
        )
        .getValues()

    console.log(contentList)
    return contentList
}

// 配列をnotionAPIに投げれる形に
const createDiaryPageContentList = (contentList) => {
    const diaryPageContentList = contentList.map((content) => {
        console.log(content[0])
        return {
            object: 'block',
            type: 'heading_3',
            heading_3: {
                text: [{ type: 'text', text: { content: content[0] } }],
            },
        }
    })

    console.log(diaryPageContentList)

    return diaryPageContentList
}

// 定時実行する関数
const createEmptyDiaryForToday = () => {
    const diaryDbId = PropertiesService.getScriptProperties().getProperty(
        'diaryDbId'
    )
    const token = PropertiesService.getScriptProperties().getProperty('token')

    const now = new Date()
    console.log(now)
    const resp = createDiaryPage(diaryDbId, now, token)
    console.log(resp)
}
