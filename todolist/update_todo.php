<?php
  require_once('conn.php');
    // 引入連線檔
  header('Content-type:application/json;charset=utf-8');
    // 若要輸出 JSON 的資料要加此 header
  header('Access-Control-Allow-Origin: *');
    // 同源政策


  // 檢查是否有輸入值，無則報錯
  if (empty($_POST['content'])) {
    $json = array(
      "ok" => false,
      "message" => "Please input missing fields",
    );
    $response = json_encode($json);
    echo $response;
    die(); 
  }

  // 取輸入值
  $content = $_POST['content'];
  $id = $_GET['id'];

  // prepare SQL 語法
  $sql = "update YiHeng_todo set content = ? where id = ?";

  // 合併SQL語句與輸入值並執行
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('si', $content, $id);
  $result = $stmt->execute();

  // execute 錯誤訊息
  if(!$result) {
    $json = array(
      "ok" => false,
      "message" => $conn->error
    );
    $response = json_encode($json);
    echo $response;
    die();
  }

  // execute 成功訊息
  $json = array(
    "ok" => true,
    "message" => "success",
    "phpId" => $id
  );
  $response = json_encode($json);
  echo $response;
?>