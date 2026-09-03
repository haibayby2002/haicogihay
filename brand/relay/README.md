# Contact form → email

The landing page is static, so the **Gửi yêu cầu** button POSTs the request to a
tiny free relay on **Google Apps Script**, which emails it to
`nguyenquyhai2002@gmail.com`. On `200 OK` the page shows the green ✓ badge.

```
visitor → fetch(POST) → Apps Script Web App → Gmail → you
```

## Deploy (~2 minutes)

1. Open <https://script.google.com> → **New project**.
2. Delete the sample code, paste **`Code.gs`** from this folder, **Save**.
3. Function dropdown → `sendTest` → **Run** → **Review permissions** → allow.
   → a test email lands in `nguyenquyhai2002@gmail.com`.
4. **Deploy → New deployment → Web app**
   - *Execute as:* **Me**
   - *Who has access:* **Anyone**
   → **Deploy** → copy the **Web app URL** (`https://script.google.com/macros/s/…/exec`).
5. Paste it into `brand/config.json`:

   ```json
   "contact": {
     "submitEndpoint": "https://script.google.com/macros/s/…/exec",
     "accessKey": "",
     "email": "nguyenquyhai2002@gmail.com"
   }
   ```

6. `python build.py`

Done — submissions now arrive by email and the visitor sees the success badge.

### Notes

- To change the address: edit `NOTIFY_EMAIL` at the top of `Code.gs`, or add a
  Script Property `NOTIFY_EMAIL` (Project Settings → Script properties), then
  redeploy (**Deploy → Manage deployments → edit → new version**).
- **Before deploying** (`submitEndpoint` empty), the button falls back to opening
  a pre-filled email draft in the visitor's mail app.
- Gmail free accounts can send ~100 emails/day via Apps Script — plenty here.
- No `accessKey` needed for Apps Script; it's only for form services like
  Web3Forms.
