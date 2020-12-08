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

  // prepare SQL 語法
  $sql = "insert into YiHeng_todo(content) values(?)";

  // 合併SQL語句與輸入值並執行
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $content);
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
    "phpId" => $conn->insert_id + 1
  );
  $response = json_encode($json);
  echo $response;
?>