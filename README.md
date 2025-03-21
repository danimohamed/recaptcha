![image](https://github.com/user-attachments/assets/c9ff6287-9517-43d3-a260-4786a3272192)
![image](https://github.com/user-attachments/assets/4adeffe9-7893-48f5-b93e-b6aa38b504d4)
![image](https://github.com/user-attachments/assets/86ee03dd-6627-46df-99e0-f53ab8308a55)


# reCAPTCHA Google v2

reCAPTCHA is a free service from Google that helps protect websites from spam and abuse. This README provides an overview of how to integrate and use reCAPTCHA v2 on your website.

## Table of Contents
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Server-side Validation](#server-side-validation)
- [Customization](#customization)
- [Troubleshooting](#troubleshooting)
- [Resources](#resources)

## Getting Started

To use reCAPTCHA v2, you need to sign up for an API key pair for your site. The key pair consists of a site key and a secret key.

1. Go to the [reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin).
2. Register your site and choose reCAPTCHA v2.
3. Get your site key and secret key.

## Installation

Include the reCAPTCHA API script in the `<head>` section of your HTML:

```html
<script src="https://www.google.com/recaptcha/api.js" async defer></script>
```

## Usage

Add the reCAPTCHA widget to your form:

```html
<form action="?" method="POST">
    <div class="g-recaptcha" data-sitekey="your_site_key"></div>
    <br/>
    <input type="submit" value="Submit">
</form>
```

Replace `your_site_key` with the site key you obtained from the reCAPTCHA Admin Console.

## Server-side Validation

After the user submits the form, you need to verify the reCAPTCHA response on your server. Here is an example using PHP:

```php
<?php
$secret = 'your_secret_key';
$response = $_POST['g-recaptcha-response'];
$remoteip = $_SERVER['REMOTE_ADDR'];

$verify = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$secret}&response={$response}&remoteip={$remoteip}");
$captcha_success = json_decode($verify);

if ($captcha_success->success) {
        // Verified - proceed with form processing
} else {
        // Verification failed - handle the error
}
?>
```

Replace `your_secret_key` with the secret key you obtained from the reCAPTCHA Admin Console.

## Customization

You can customize the reCAPTCHA widget using various parameters. For example, to change the theme to dark:

```html
<div class="g-recaptcha" data-sitekey="your_site_key" data-theme="dark"></div>
```

## Troubleshooting

- Ensure that you have included the reCAPTCHA API script correctly.
- Verify that your site key and secret key are correct.
- Check for any JavaScript errors in the browser console.
- Make sure your server can reach the reCAPTCHA verification endpoint.

## Resources

- [reCAPTCHA Official Documentation](https://developers.google.com/recaptcha/docs/v2)
- [reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
- [reCAPTCHA GitHub Repository](https://github.com/google/recaptcha)
