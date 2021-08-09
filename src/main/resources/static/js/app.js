var stompClient = null;

var txtNameElem = document.querySelector('#txtName');
var btnSendElem = document.querySelector('#send');

// 버튼 t/f
function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
    var txtNameVal = txtNameElem.value;
    btnSendElem.dataset.room = txtNameVal;


    var socket = new SockJS(`/websocket`);
    stompClient = Stomp.over(socket); // 실제 연결 코드
    // SockJS와 stomp client를 통해 연결을 시도.
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        // 여기서 값을 받았을떄 메세지가 동작하도록.
        // 라우팅 역할
        stompClient.subscribe(`/topic/${btnSendElem.dataset.room}`, function (greeting) {
            showGreeting(JSON.parse(greeting.body).content);
        });
    });


}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect(); // 실제 연결해제 코드
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
    // /app/hello로 JSON 파라미터를 메세지 body로 전송.
    var txtNameVal = txtNameElem.value;
    var room = btnSendElem.dataset.room;
    stompClient.send(`/app/hello/${room}`, {}, JSON.stringify({'name': $("#name").val()}));
}

function showGreeting(message) {
    $("#greetings").append("<tr><td>" + message + "</td></tr>");
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() { sendName(); });
});