let game_start = false;
let time = 0;
let numbers_seq = [];
let current_black_pos = 4;
const grid_margin = ["0 0", "0 110px", "0 220px",
    "110px 0", "110px 110px", "110px 220px",
    "220px 0", "220px 110px", "220px 220px"
];

let timer = null;

$(document).ready(function () {
    reset();
});

$(document).keypress(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);

    if ((keycode == 119 || keycode == 97 || keycode == 115 || keycode == 100) && !game_start) {
        game_start = true;
        time = 0;
        timer = setInterval(function () {
            time++;
            let seconds = time / 100;
            $('.timer').text(seconds + ' s');
        }, 10);
    }

    if (keycode == 119) { // W
        blankMoveDown();
    } else if (keycode == 97) { // A
        blankMoveRight();
    } else if (keycode == 115) { // S
        blankMoveUp();
    } else if (keycode == 100) { // D
        blankMoveLeft();
    }

    if (checkCompletion()) {
        $('.overlay').removeClass("hidden");
        clearInterval(timer);
    }
});

function reset() {
    $('.overlay').addClass("hidden");
    clearInterval(timer);
    game_start = false;
    $('.timer').text('00.00 s');
    do {
        numbers_seq = [1, 2, 3, 4, 5, 6, 7, 8];
        numbers_seq.sort(function () {
            return 0.5 - Math.random()
        });
        numbers_seq.push(numbers_seq[4]);
        numbers_seq[4] = 0;
        current_black_pos = 4;
    } while (!isSolvable(numbers_seq))
    $('.game-container').html('');
    for (i = 0; i < 9; i++) {
        if (numbers_seq[i] != 0) {
            $('.game-container').append('<div class="tiles flex-center" id="t' + numbers_seq[i] + '" style="margin:' + grid_margin[i] + ';"><h3>' + numbers_seq[i] + '</h3></div>');
        }
    }
}

function checkCompletion() {
    if (numbers_seq[8] == 0) {
        for (i = 0; i < 8; i++) {
            if (numbers_seq[i] != i + 1) {
                return false;
            }
        }
        return true;
    } else {
        return false;
    }
}

function blankMoveDown() {
    if (current_black_pos + 3 <= 8) {
        let swap_with_number = numbers_seq[current_black_pos + 3];
        $("#t" + swap_with_number).css("margin", grid_margin[current_black_pos]);
        numbers_seq[current_black_pos] = swap_with_number;
        numbers_seq[current_black_pos + 3] = 0;
        current_black_pos = current_black_pos + 3;
    }
}

function blankMoveUp() {
    if (current_black_pos - 3 >= 0) {
        let swap_with_number = numbers_seq[current_black_pos - 3];
        $("#t" + swap_with_number).css("margin", grid_margin[current_black_pos]);
        numbers_seq[current_black_pos] = swap_with_number;
        numbers_seq[current_black_pos - 3] = 0;
        current_black_pos = current_black_pos - 3;
    }
}

function blankMoveLeft() {
    if (current_black_pos - 1 >= 0 && current_black_pos != 0 && current_black_pos != 3 && current_black_pos != 6) {
        let swap_with_number = numbers_seq[current_black_pos - 1];
        $("#t" + swap_with_number).css("margin", grid_margin[current_black_pos]);
        numbers_seq[current_black_pos] = swap_with_number;
        numbers_seq[current_black_pos - 1] = 0;
        current_black_pos = current_black_pos - 1;
    }
}

function blankMoveRight() {
    if (current_black_pos + 1 >= 0 && current_black_pos != 8 && current_black_pos != 2 && current_black_pos != 5) {
        let swap_with_number = numbers_seq[current_black_pos + 1];
        $("#t" + swap_with_number).css("margin", grid_margin[current_black_pos]);
        numbers_seq[current_black_pos] = swap_with_number;
        numbers_seq[current_black_pos + 1] = 0;
        current_black_pos = current_black_pos + 1;
    }
}

function isSolvable(seq) {
    let count = 0;
    for (let i = 0; i < 9; i++) {
        for (let j = 1; j < 8; j++) {
            if (seq[i] > seq[j] && seq[i] != 0 && seq[j] != 0) {
                count++;
            }
        }
    }
    return (count%2 != 0);
}