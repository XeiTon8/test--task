import { google, sheets_v4} from "googleapis";
export class GoogleSheetsAdapter {

    private sheets: sheets_v4.Sheets;

    constructor() {
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets']
        })

        this.sheets = google.sheets({version: 'v4', auth})
    }

    public async updateSheets(spreadsheetID: string, sheetName: string, rows: any[][]) {

    return await this.sheets.spreadsheets.values.update({
            spreadsheetId: spreadsheetID,
            range: `${sheetName}!A1`,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: rows
            }
        });
    }

}