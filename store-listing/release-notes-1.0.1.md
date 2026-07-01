# Axum Geez 1.0.1 Release Notes

## Microsoft Store Preparation

- Updated installer metadata for Microsoft Store Win32 EXE submission.
- Updated publisher to `AdisTech Solutions`.
- Set application version to `1.0.1`.
- Added x64 architecture restrictions.
- Added publisher, support, update, and website URLs to Installed Apps metadata.
- Confirmed silent install support:

```text
/VERYSILENT /SUPPRESSMSGBOXES /NORESTART /SP-
```

- Added public return code documentation:

```text
https://axumgeez.adischat.com/docs/installer-return-codes
```

## Notes

The direct website EXE may still show Unknown Publisher until the installer is signed by Microsoft Store distribution, an approved open-source signing service, or a trusted code-signing certificate.
