const quotes = [
    {
        quote: "당신이 행하는 일이 큰 의미가 있지 않을 수도 있지만, 무엇인가를 실행하고 있다는 것은 매우 중요한 것입니다.",
        author: "Mahatma Gandhi"
    },
    {
        quote: "마음만을 가지고 있어서는 안된다. 반드시 실천하여야 한다.",
        author: "이소룡"
    },
    {
        quote: "사람은 누구나 자기가 할 수 있다고 생각하는 것 이상의 것을 할 수 있습니다.",
        author: "Henry Ford"
    },
    {
        quote: "네 자신의 불행을 생각하지 않게 되는 가장 좋은 방법은 일에 몰두하는 것이다. ",
        author: "베토벤"
    },
    {
        quote: "당신이 가장 존중해야 하는 사람은 언제나 당신 자신이다.",
        author: "도서 '나는 나로 살기로 했다'中"
    },
    {
        quote: "크게 실패할 용기 있는 자만이 크게 이룰 수 있습니다.",
        author: "John F.Kennedy"
    },
    {
        quote: "모든 사람을 다 만족시키려 하는 것은 불가능하다. 때에 따라 소신있게 추진해야 한다.",
        author: "Ernie J. Zelinski"
    },
    {
        quote: "나는 행운을 굳게 믿는다. 내가 열심히 하면 할수록 행운이 더 따른다는 것도 알고 있다.",
        author: "Thomas Jefferson"
    },
    {
        quote: "당신이 할 수 없는 일들로 인해, 할 수 있는 일들이 방해받지 않도록 하십시오.",
        author: "John Wooden"
    },
    {
        quote: "내가 원하지 않는 바를 남에게 행하지 말라.",
        author: "공자"
    },
    ];
    
    const quote = document.querySelector("#quote span:first-child");
    const author = document.querySelector("#quote span:last-child");
    
    const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];
    
    quote.innerText = todaysQuote.quote;
    author.innerText = todaysQuote.author;