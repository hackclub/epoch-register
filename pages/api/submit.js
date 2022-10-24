import { registrationsAirtable } from '../../lib/airtable'
import { requiredList } from '../../lib/manifest'
import { getAge, validateEmail } from '../../lib/helpers';

export default async function Submit (req, res) {
    const missing = [];
    try {
        for (const item in requiredList()) {
            try {
                if (!requiredList()[item](req.body)) {
                    missing.push(item);
                }
            } catch (err) {

            }
        }
    } catch (err) {
        return res.json({ success: false, error: `You're missing some fields. Please fill in all missing questions.` });
    }
    if(getAge(req.body["Birthday"]) >= 19){
        return res.json({ success: false, error: `Sorry, Epoch is only for high school students. Please email us regarding exceptional circumstances.` });
    }
    if(!validateEmail(req.body["Email"])){
        return res.json({ success: false, error: `Please enter a valid email.` });
    }
    if (missing.length > 5) return res.json({ success: false, error: `You're missing some fields. Please fill in all missing questions.` });
    if (missing.length) return res.json({ success: false, error: `You are missing some fields: ${missing.map(item => `"${item}"`).join(", ")}` });

    try {
        await registrationsAirtable.create(req.body);
    } catch (err) {
        return res.json({ success: false, error: err.message });
    }
    return res.json({ success: true });
}