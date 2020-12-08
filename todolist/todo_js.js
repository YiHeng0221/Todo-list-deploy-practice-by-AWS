const baseURL = 'http://mentor-program.co/mtr04group1/YiHengWu/week12/hw2/';
let undoneTodoCount = 0;
let allTodoCount = 0;
let id = 1;

$(document).ready(() => {

  // 取 url 中的 id
  const searchParams = new URLSearchParams(window.location.search);
  const todoId = searchParams.get('id');

  // 抓取資料並渲染
  const container = $('.list_content');
  if (todoId) {
    $.getJSON(`${baseURL}get_todo.php?id=${todoId}`, (data) => {
      const todos = JSON.parse(data.data.content);
      if (!todos) {
        return;
      }
      for (let i = 0; i < todos.length; i++) {
        prependList(container, todos[i]);
      }
    });
  }

  // 新增 todo
  const addTodo = $('.list_enter');
  const inputValue = $('input[name="content"]');
  addTodo.on('keyup', '#list_value', (e) => {
    const content = inputValue.val().trim();
    const newTodo = {
      content: $('input[name="content"]').val(),
    };
    if (e.key === 'Enter' && content) {
      prependList(container, newTodo);
      $('input[name="content"]').val('');
    }
  });

  // 刪除 todo
  container.on('click', '.list_btn_delete', (e) => {
    const targetParents = $($(e.target).parents('.list_item'));
    targetParents.fadeOut();
    setTimeout(() => { targetParents.remove(); }, 450);
    const isChecked = $(e.target).siblings('.list_btn_check').is(':checked');
    allTodoCount--;
    if (!isChecked) {
      undoneTodoCount--;
    }
    updateCounter();
  });

  // 刪除已完成
  $('#clear_all_done').click(() => {
    $('.list_item.finished').each((i, el) => {
      el.remove();
      updateCounter();
    });
  });

  // 完成 todo
  container.on('click', '.list_btn_check', (e) => {
    if (e.target.checked) {
      $($(e.target).parents('.list_item')).addClass('finished').removeClass('unfinished');
      undoneTodoCount--;
      updateCounter();
    } else {
      $($(e.target).parents('.list_item')).removeClass('finished').addClass('unfinished');
      undoneTodoCount++;
      updateCounter();
    }
  });

  // filter
  const filters = $('.filter_btns');
  filters.on('click', '.btn', (e) => {
    const target = $(e.target);
    const filter = $(e.target).attr('id');
    const siblings = target.siblings();
    siblings.removeClass('active');
    target.addClass('active');
    switch (filter) {
      case 'list_btn_all':
        $('.list_item').show();
        break;
      case 'list_btn_done':
        $('.unfinished').hide();
        $('.finished').show();
        break;
      case 'list_btn_undone':
        $('.finished').hide();
        $('.unfinished').show();
        break;
      default:
        $('.list_item').show();
        break;
    }
  });

  saveOrUpdate('#save', 'add_todo.php');
  saveOrUpdate('#update', `update_todo.php?id=${todoId}`);

});

// 跳脫字元，用來避免 xss injection or sql injection 等等利用特殊字元的攻擊。
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// 計算 todo 數量
function updateCounter() {
  $('.counter').text(undoneTodoCount);
}

// 渲染 todo
function prependList(container, list) {
  const undone = `
    <div class="list_item unfinished">
      <input class="list_btn_check" type="checkbox" id="${id}" />
      <lable class="list_text" for="${id}">${escapeHtml(list.content)}</lable>
      <div class="list_btn_delete"></div>
    </div>`;
  const done = `
    <div class="list_item finished">
      <input class="list_btn_check" type="checkbox" id="${id}" checked/>
      <lable class="list_text" for="${id}">${escapeHtml(list.content)}</lable>
      <div class="list_btn_delete"></div>
    </div>`;
  if (list.checked) {
    container.prepend(done).slideDown();
    allTodoCount++;
    updateCounter();
  } else {
    container.prepend(undone).slideDown();
    allTodoCount++;
    undoneTodoCount++;
    updateCounter();
  }
  id++;
}

function saveOrUpdate(btn, url) {
  $(btn).click(() => {
    const todos = [];
    $($('.list_item').get().reverse()).each((i, element) => {
      const input = $(element).find('.list_btn_check');
      const lable = $(element).find('.list_text');

      todos.push({
        id: input.attr('id'),
        checked: input.is(':checked'),
        content: lable.text(),
      });
    });
    const data = JSON.stringify(todos);
    // 轉換成JSON 格式

    $.ajax({
      type: 'POST',
      url: `${baseURL}${url}`,
      data: {
        content: data,
      },
      success: function(res) {
        console.log('res:', res);
        const respId = res.phpId;
        window.location = `todo.html?id=${respId}`;
        // 跳至一個新的 todo
      },
      error: function (res) {
        console.log('res:', res);
        alert('Fail');
      },
    });
  });
}
