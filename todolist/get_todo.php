<?php
  require_once('conn.php');
  // 引入連線檔
  header('Content-type:application/json;charset=utf-8');
  // 若要輸出 JSON 的資料要加此 header
  header('Access-Control-Allow-Origin: *');
  // 同源政策

  // 檢查是否有 id，無則報錯
  if (
    empty($_GET['id'])
  ) {
    $json = array(
      "ok" => false,
      "message" => "Please add phpId in url",
    );
    $response = json_encode($json);
    echo $response;
    die(); 
  }

  $id = intval($_GET['id']);
 
  
  // prepare SQL 語法 
  $sql = "select * from YiHeng_todo where id = ?";

  // 合併SQL語句與 id 並執行
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $id);
  
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

  // 成功後則把資料取回
  $result = $stmt->get_result();
  
  $row = $result->fetch_assoc();
  

  // execute 成功訊息
  $json = array(
    "ok" => true,
    "data" => array(
      "id" => $row['id'],
      "content" => $row['content'],
    )
  );
  $response = json_encode($json);
  echo $response;
?>