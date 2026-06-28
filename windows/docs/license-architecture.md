# Axum Geez License Architecture

Axum Geez is designed so the installer can remain freely downloadable while the installed app can later move to subscription enforcement without reinstalling.

## Client Flow

1. On first launch the client computes a SHA256 device fingerprint.
2. If `LicenseServerUrl` is configured, the client registers with `/api/license/register`.
3. The server returns an RSA-signed license envelope.
4. The app stores the signed token and validates it using only the embedded RSA public key.
5. The app validates silently every 24 hours and sends a heartbeat.
6. If the device fingerprint does not match the signed token, typing is disabled with: `This copy belongs to another device.`

## Server Tables

Users:
- `id`
- `email`
- `display_name`
- `created_at`
- `status`

Devices:
- `id`
- `user_id`
- `device_id_hash`
- `app_version`
- `first_seen_at`
- `last_seen_at`
- `status`
- `transfers_used_this_year`

Licenses:
- `id`
- `user_id`
- `device_id`
- `license_type`: `FREE`, `MONTHLY`, `YEARLY`, `LIFETIME`, `TRIAL`
- `subscription_start`
- `subscription_end`
- `status`
- `payment_reference`
- `last_validation_at`
- `subscription_required`
- `subscription_required_at`
- `subscription_grace_until`

Payments:
- `id`
- `user_id`
- `plan`
- `amount`
- `currency`
- `provider`
- `payment_reference`
- `paid_at`
- `status`

EmergencyUnlocks:
- `id`
- `user_id`
- `device_id`
- `code_hash`
- `expires_at`
- `used_at`

## Endpoints

`POST /api/license/register`

Request:
- `device_id`
- `app_version`
- `platform`

Response:
- `license`
- `server_time`
- `notice`

`POST /api/license/validate`

Request:
- `device_id`
- `app_version`
- `current_license`
- `last_seen`

Response:
- signed current license token
- subscription changes
- subscription-required notices

`POST /api/license/heartbeat`

Request:
- `device_id`
- `app_version`
- `subscription_status`
- `last_seen`

## Enforcement Rules

- Online validation interval: 24 hours.
- Offline allowance: 7 days.
- Emergency offline period: 24 hours.
- Expired subscription grace: 3 days.
- Subscription-required migration grace: 30 days.
- Emergency unlock duration: 72 hours.
- Device transfers: 2 per year.

## Security

- Server signs license tokens with RSA private key.
- App ships only the RSA public key.
- Hardware identifiers are never stored raw; only the SHA256 fingerprint is used.
- Server should rate-limit activation and validation endpoints.
- Client detects clock rollback using the last-seen clock value.
- Release builds should be obfuscated before public distribution.

## Future Premium Features

Premium feature flags can be delivered inside the signed token:
- Cloud dictionary sync
- Custom Brana fonts
- Theme sync
- Backup settings
- Multiple layouts
- AI prediction
- Voice typing
- Priority updates
