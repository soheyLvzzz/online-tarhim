# راهنمای عملی ساخت محیط آزمایشی و مخزن

اطلاعات اعلام‌شدهٔ کاربر: دامنه onlinetarhim.com، پنل cPanel، پوشهٔ public_html؛ سایت فعلی خالی است. کاربر عملیات را خودش با راهنمایی انجام می‌دهد و مخزن GitHub شخصی می‌خواهد. نام شرکت هاست ارائه نشده و برای این مسیر استاندارد فعلاً مانع نیست. دسترسی حساب یا رمز دریافت نشده است.

## بسته‌های تحویل

- online-tarhim-staging-upload.zip فقط خروجی آمادهٔ مرورگر است: index.html، assets و fonts. فایل‌ها در ریشهٔ ZIP هستند، نه داخل پوشهٔ dist. این نسخه در HTML متای noindex,nofollow دارد؛ فقط برای مسیر آزمایشی است و نباید به‌عنوان انتشار نهایی ریشه استفاده شود. noindex محدودیت دسترسی یا رمز نیست.
- online-tarhim-github-source.zip سورس، اسناد، فایل قفل و تنظیمات توسعه را دارد؛ node_modules، dist، پیش‌نمایش مستقل، Git داخلی و bundle را ندارد. به‌عنوان ZIP داخل GitHub آپلود نشود؛ باید استخراج و فایل‌های داخل آن ثبت شوند.

## گام‌های cPanel

۱. وارد File Manager شوید و پوشهٔ دقیق public_html دامنه onlinetarhim.com را باز کنید. اگر چند دامنه دارید، مسیر Document Root در Domains باید همین باشد. فعلاً هیچ index یا فایل ریشه تغییر نکند.

۲. یک پوشهٔ جدید با نام staging ایجاد کنید. اگر از قبل وجود دارد، محتویاتش را بدون بررسی و پشتیبان‌گیری جایگزین نکنید و وضعیت را گزارش کنید.

۳. وارد public_html/staging شوید. online-tarhim-staging-upload.zip را Upload کنید. پس از پایان آپلود، در File Manager فایل ZIP را انتخاب و Extract کنید. مقصد استخراج همان public_html/staging باشد.

۴. در همین پوشه باید index.html، assets و fonts کنار هم باشند؛ نباید یک پوشهٔ اضافی مثل dist یا online-tarhim-phase06 بین staging و index.html قرار بگیرد. پس از اطمینان از استخراج، ZIP آپلودی را می‌توانید حذف کنید؛ فایل‌های استخراج‌شده بمانند.

۵. https://onlinetarhim.com/staging/ را باز کنید. وضعیت مشاهده را گزارش کنید: لندینگ کامل، صفحهٔ سفید، لیست فایل‌ها یا خطای مشخص. HTTPS و عملکرد واقعی این مسیر هنوز توسط عامل بررسی نشده‌اند. index.php موجود داخل staging ممکن است بر index.html اولویت بگیرد؛ فایل ناشناخته را حذف نکنید و وضعیت را بگویید.

۶. برای محدودکردن دسترسی نسخهٔ آزمایشی، در Directory Privacy فقط پوشهٔ staging را انتخاب و Password protect this directory را فعال و Save کنید؛ سپس برای همان پوشه یک کاربر/رمز بازبینی ایجاد کنید. این مرحله فقط اگر محیط آزمایشی خصوصی می‌خواهید انجام شود. اطلاعات ورود را در گفتگو نفرستید. پوشهٔ public_html را اشتباهاً محدود نکنید. نسخهٔ بدون این تنظیم از طریق نشانی آزمایشی قابل دسترس است؛ noindex خصوصی‌سازی نیست.

۷. تغییر ریشهٔ سایت، SSL/DNS یا انتشار نهایی در این دستورالعمل انجام نمی‌شود. بعد از تأیید آزمایشی، بستهٔ انتشار نهایی بدون noindex جداگانه تهیه می‌شود.

## گام‌های GitHub در مرورگر

۱. وارد حساب شخصی خود شوید و https://github.com/new را باز کنید.

۲. Owner حساب خودتان، Repository name برابر onlinetarhim و Visibility برابر Private انتخاب شود؛ اگر این نام از قبل وجود دارد نام دیگری مثل onlinetarhim-landing انتخاب کنید. چون سورس README و .gitignore دارد، گزینه‌های ساخت README، .gitignore و License را فعال نکنید و Create repository را بزنید.

۳. مخزن خالی را می‌توان با uploading an existing file پر کرد؛ در مخزن دارای فایل، Add file سپس Upload files استفاده می‌شود. online-tarhim-github-source.zip را روی رایانه استخراج کنید. محتویات داخل پوشهٔ ریشهٔ آن را به صفحهٔ Upload بکشید، نه خود ZIP و نه پوشهٔ والد. package.json و src باید در ریشهٔ مخزن باشند. فایل‌های نقطه‌دار تنظیمات مثل .gitignore و .node-version نیز باید منتقل شوند.

۴. پیام commit مثل Initial landing source بنویسید و Commit changes را بزنید. این روش یک snapshot از سورس ایجاد می‌کند؛ تاریخچهٔ Git محلی قبلی را منتقل نمی‌کند. فایل Git bundle نسخهٔ قبل برای حفظ تاریخچه در دسترس است؛ اگر انتقال همان تاریخچه موردنظر است، قبل از بارگذاری مرورگری باید روش push با Git انتخاب شود.

۵. لینک مخزن به شکل https://github.com/USERNAME/onlinetarhim را ارسال کنید. مخزن Private برای عامل بدون اتصال/اجازهٔ مناسب قابل خواندن نیست؛ مشاهدهٔ لینک یا ساخته‌شدن مخزن، ادعای اتصال remote یا تأیید محتوای آن ایجاد نمی‌کند. انتشار cPanel هم با ساخت GitHub خودکار نمی‌شود.

۶. رمز، PAT و کلید SSH را در چت یا فایل پروژه قرار ندهید. این مسیر مرورگری به ارسال آن‌ها در گفتگو نیاز ندارد.

## مراجع رسمی

- https://docs.cpanel.net/cpanel/files/file-manager/
- https://docs.cpanel.net/cpanel/files/directory-privacy/
- https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository
- https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository

## راهنمای به‌روز برای مخزن ساخته‌شده

مخزن کاربر اکنون https://github.com/soheyLvzzz/online-tarhim است و طبق اعلام او خالی است. نیازی به ساخت مخزن جدید نیست. ZIP سورس جدید را روی رایانه استخراج و محتویات پوشهٔ online-tarhim-source را از uploading an existing file بارگذاری کنید؛ خود ZIP را آپلود نکنید. package.json، src، public، docs و فایل‌های تنظیمات در ریشه باشند. Commit changes را با پیام Update landing source بزنید. راهنمای قبلیِ ایجاد مخزن، برای این مخزن دیگر لازم نیست. این کار را کاربر انجام می‌دهد؛ عامل نه وارد حساب شده نه فایلی ارسال کرده است.

بستهٔ favicon-tab-fix.zip فقط برای public_html ریشه است؛ بعد از گرفتن کپی index.html فعلی، آن را همان‌جا استخراج و جایگزینی index.html را انجام دهید. favicon-white-v2.png باید کنار index.html باشد. بعد از بستن و بازکردن تب، فایل آیکون و DOM صفحه باید بررسی شوند. source ZIP هرگز به public_html آپلود نشود.

برای محیط آزمایشی مجزا، بستهٔ staging-current.zip را داخل public_html/staging استخراج کنید. این نسخه noindex دارد و جایگزین بستهٔ ریشه نیست. این اقدام ایجادشده فرض نمی‌شود تا کاربر نتیجهٔ بازشدن نشانی را گزارش کند.
