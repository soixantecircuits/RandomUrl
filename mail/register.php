<?php
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
require_once 'lib/swift_required.php';
// écriture de données
if (!empty($_POST))
{
	if (isset($_POST['name']) != '') { 
		$_POST['name'] = sanitize($_POST['name']); 
		if (strlen ($_POST['name']) < 2)
		{
			$errMsg = 'Votre nom semble trop court';
		}
	}
	if (isset($_POST['message']) != '') { $_POST['message'] = sanitize($_POST['message']); }
	if (isset($_POST['email']) != '') { 
		$_POST['email'] = sanitize($_POST['email']);
		if(!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)){ 
			$errMsg = 'Votre email n\'est pas valide';
		} 
	}
	/* ERREURS
		0: 	Veuillez indiquer votre nom
		1:	L'adresse email que vous avez indiquée n'est pas valide
		2:	Score non valide
		3:  Pays non valide
		10: Erreur SQL : L'inscription s'est mal déroulée
		11:	Erreur SQL : ne peut pas recuperer l'id du score qu'on vient d'inserer
		100: Erreur Connexion MySQL
		101: Erreur selection bdd
		102: Erreur set names utf-8
		200: Mauvais parametres GET ou parametres manquants
		210: Erreur SQL : Ne paut pas lire les scores
		500: No get et no post
		600: Impossible de vider la base
	*/
		
	if (isset ($errMsg))
	{
		echo '{"success": false, "msg": '.json_encode($errMsg).'}';
		exit;
	}
	
	try {
	
		$message = Swift_Message::newInstance();
		$message->setSubject("Message depuis soixantecircuits.fr");

		

		$message->setBody('<html dir="ltr"><head>
											<meta charset="UTF-8"/>
											</head>
	<body>
		<div style="margin:0px;padding:0px;color:#000;font-size:12px;line-height:18px;background:none repeat scroll 0 0; background-color: #fff;vertical-align:baseline;font-family:"Andale Mono", Verdana, Arial, sans-serif;">'.$_POST['message'].'</div>
	</body></html>',
	   	   'text/html' //Mark the content-type as HTML
		);

		
		$message->setReturnPath($_POST['email']);
		$message->setFrom(array($_POST['email'] => 'Mailer Soixante'));
		$message->addTo('contact@soixantecircuits.fr');
		$message->setPriority(2);
		
		date_default_timezone_set("France/Paris");
		
		$transport = Swift_SendmailTransport::newInstance('/usr/sbin/sendmail -bs');

		$mailer = Swift_Mailer::newInstance($transport);
		
		$result = $mailer->send($message,$fail);



	
		echo '{"success": true, "msg": '.json_encode($result).'}';
}
	catch (Exception $e){
		echo '{"success": false, "msg": '.json_encode('10').'}';
		exit;
	}
}
// lecture des scores
else if (!empty ($_GET))
{
	echo '{"success": false, "msg": '.json_encode('Wrong STATE').'}';
	exit;
}
else{
	echo '{"success": false, "msg": '.json_encode('500').'}';
	exit;
}

function sanitize($var,$toInt=false){
	$var = stripslashes(strip_tags(trim($var)));
	return ($toInt) ? (int)$var : $var;
}

function getRealIpAddr() {
    //check ip from share internet
    if (! empty($_SERVER['HTTP_CLIENT_IP'])) {
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    }
    //to check ip is pass from proxy
    elseif (! empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    }
    else {
        $ip = $_SERVER['REMOTE_ADDR'];
    }
    return $ip;
}
?>