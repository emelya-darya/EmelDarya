<?php

// Файлы phpmailer
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';
require 'PHPMailer/Exception.php';

// Переменная с темой письма
$title = "Письмо с сайта-визитки";

// Переменная, куда будут попадать файлы, если есть в форме прикрепление файлов
// $file = $_FILES['file'];

$c = true;
// Формирование самого письма
// В итоге будет таблица с tr-ками
$title = "Письмо с сайта-визитки";
foreach ( $_POST as $key => $value ) {
  if ( $value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject" ) {
		$body .= "
    " . (($c = !$c) ? '<tr>' : '<tr style="background-color: #f8f8f8;">') . "
      <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
      <td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
    </tr>
    ";
  }
}

$body = "<table style='width: 100%;'>$body</table>";

//! Настройки PHPMailer

// Сначала создаем экземпляр класса
$mail = new PHPMailer\PHPMailer\PHPMailer();


// В блоке try-catch
try {
	// Сообщаем, что хотим использовать SMTP (чтобы письмо точно доходило, а то Янд, например, часто запрещает)
  $mail->isSMTP();
  // и кодировку UTF-8
  $mail->CharSet = "UTF-8";
  // Авторизацию по SMTP включаем
  $mail->SMTPAuth   = true;

  // Настройки вашей почты
  $mail->Host       = 'smtp.gmail.com'; // SMTP сервера вашей почты
  $mail->Username   = 'daryaemelyanova4294@gmail.com'; // Логин на почте
  $mail->Password   = 'oocwvfqxeavycccl'; // Пароль на почте
  $mail->SMTPSecure = 'ssl'; // Шифрование
  $mail->Port       = 465; // Порт

  $mail->setFrom('daryaemelyanova4294@gmail.com', 'Письмо с сайта-визитки'); // Адрес самой почты и имя отправителя

  // Получатель письма (можно несколько)
  $mail->addAddress('daryaemelyanova4294@gmail.com');
  $mail->addAddress('test-0ln71ioh1@srv1.mail-tester.com');
  $mail->addAddress('emelyadarya@yandex.ru');
//   $mail->addAddress('Другой адрес');

  // Прикрипление файлов к письму
//   if (!empty($file['name'][0])) {
//     for ($ct = 0; $ct < count($file['tmp_name']); $ct++) {
//       $uploadfile = tempnam(sys_get_temp_dir(), sha1($file['name'][$ct]));
//       $filename = $file['name'][$ct];
//       if (move_uploaded_file($file['tmp_name'][$ct], $uploadfile)) {
//           $mail->addAttachment($uploadfile, $filename);
//           $rfile[] = "Файл $filename прикреплён";
//       } else {
//           $rfile[] = "Не удалось прикрепить файл $filename";
//       }
//     }
//   }

  // Отправка сообщения
  $mail->isHTML(true);
  $mail->Subject = $title;
  $mail->Body = $body;

  $mail->send();

// Если что-то пойдет не так, то выдаст ошибку
} catch (Exception $e) {
  $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}
