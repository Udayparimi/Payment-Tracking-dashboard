let payments =
JSON.parse(localStorage.getItem("payments")) || [];

const form = document.getElementById("paymentForm");
const table = document.getElementById("paymentTable");
const search = document.getElementById("search");

form.addEventListener("submit", function(e){

    e.preventDefault();
    const amountValue =
document.getElementById("amount").value;

if(amountValue <= 0){

    alert("Amount must be greater than zero.");

    return;
}
    const paymentIdValue =
document.getElementById("paymentId").value;

const exists =
payments.some(payment =>
    payment.paymentId === paymentIdValue
);

if(exists){

    alert("Payment ID already exists.");

    return;
}

    const payment = {

        paymentId:
        document.getElementById("paymentId").value,

        bookingId:
        document.getElementById("bookingId").value,

        amount:
        document.getElementById("amount").value,

        date:
        document.getElementById("date").value,

        method:
        document.getElementById("method").value

    };

    payments.push(payment);

    localStorage.setItem(
        "payments",
        JSON.stringify(payments)
    );

    displayPayments();
    updateStats();

    form.reset();

});

function displayPayments(data = payments){

    table.innerHTML = "";

    data.forEach(payment => {

        table.innerHTML += `

        <tr>

            <td>${payment.paymentId}</td>

            <td>${payment.bookingId}</td>

            <td>₹${payment.amount}</td>

            <td>${payment.method}</td>

            <td>${payment.date}</td>

        </tr>

        `;

    });

}

function updateStats(){

    let revenue = 0;
    let highest = 0;

    payments.forEach(payment => {

        revenue += Number(payment.amount);

        if(Number(payment.amount) > highest){

            highest = Number(payment.amount);

        }

    });

    let average =
    payments.length > 0
    ? revenue / payments.length
    : 0;

    document.getElementById("revenue").textContent =
    "₹" + revenue;

    document.getElementById("paymentsCount").textContent =
    payments.length;

    document.getElementById("highestPayment").textContent =
    "₹" + highest;

    document.getElementById("averagePayment").textContent =
    "₹" + average.toFixed(2);

}

search.addEventListener("keyup", () => {

    const term = search.value;

    const filtered = payments.filter(payment =>
        payment.bookingId.includes(term)
    );

    displayPayments(filtered);

});
search.addEventListener("keyup", () => {

    const term = search.value;

    const filtered = payments.filter(payment =>
        payment.bookingId.includes(term)
    );

    displayPayments(filtered);

});

const filterMethod =
document.getElementById("filterMethod");

filterMethod.addEventListener("change", () => {

    const selected =
    filterMethod.value;

    if(selected === "All"){

        displayPayments();

        return;
    }

    const filtered =
    payments.filter(payment =>
        payment.method === selected
    );

    displayPayments(filtered);

});

displayPayments();
updateStats();