import {JWT} from "google-auth-library";
import {google} from "googleapis";
import {NextApiRequest, NextApiResponse} from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const client = new JWT({
                email: process.env.GOOGLE_AUTH_EMALI as string,
                key: (process.env.GOOGLE_AUTH_KEY as string).replace(new RegExp("\\\\n", "\g"), "\n"),
                scopes: ["https://www.googleapis.com/auth/spreadsheets"],
            });

            const sheets = google.sheets({ version: 'v4', auth: client });

            const response = await sheets.spreadsheets.values.get({
                spreadsheetId: process.env.SPREADSHEET_ID,
                range: 'A1:A',
            });

            const rows = response.data.values as Array<Array<string>>;

            const temp = rows.map((row) => { return row[0] });

            res.status(200).json({ numbers: temp, success: true });
        } catch (err) {
            console.log(err);
            res.status(500).json({ success: false });
        }

        // return [];
};
