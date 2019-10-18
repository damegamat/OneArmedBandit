class Game {
    constructor(start) {
        this.stats = new Statistics();
        this.wallet = new Wallet(start);
        document.getElementById('start').addEventListener('click', this.startGame.bind(this));
        this.spanWallet = document.querySelector('.panel span.wallet');
        this.boards = document.querySelectorAll('div.color');
        this.inputBid = document.getElementById('bid');
        this.spanResult = document.querySelector('.score span.result');
        this.spanWins = document.querySelector('.score span.win');
        this.spanLosses = document.querySelector('.score span.loss');
        this.spanGames = document.querySelector('.score span.number');

        this.render();
    }
    render(colors = ['gray', 'gray', 'gray'], money = this.wallet.getWalletValue(),
        result = "", stats = [0, 0, 0], wonBid = 0, bid = 0) {
        console.log('grmy');
        this.boards.forEach((board, i) => {
            board.style.backgroundColor = colors[i]
        });
        this.spanWallet.textContent = money;
        if (result) {
            result = `You Won ${wonBid}$.`;
        } else if (!result && result !== "") {
            result = `You Lost ${bid}$.`
        }
        this.spanResult.textContent = result;
        this.spanGames.textContent = stats[0];
        this.spanWins.textContent = stats[1];
        this.spanLosses.textContent = stats[2];
        this.inputBid.value = "";
    }

    startGame() {
        if (this.inputBid.value < 1) return alert('Too small amount');
        const bid = Math.floor(this.inputBid.value)
        // if (this.inputBid.value < 1) return alert('Too small amount');
        if (!this.wallet.checkCanPlay(bid)) {
            return alert('You do not have enough funds');
        }
        this.wallet.changeWallet(bid, "-")
        this.draw = new Draw();

        const colors = this.draw.getDrawResult();

        const win = Result.checkWinner(colors);
        const wonBid = Result.moneyWinInGame(win, bid);
        this.wallet.changeWallet(wonBid);
        this.stats.addGameToStatistics(win, bid);

        this.render(colors, this.wallet.getWalletValue(),
            win, this.stats.showGameStatistics(), wonBid, bid)
    }
}