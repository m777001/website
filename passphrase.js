const a1 = "d26b30cf74ba5966c76658b03e666fb01918514c01edd792459670c5eeef7f75";
const b1 = "@9", b2 = "X#", b3 = "Lm", b4 = "!2";
const c1 = b1 + b2 + b3 + b4;

async function x1(y1) {
    const z1 = new TextEncoder();
    const a2 = z1.encode(y1);
    const b5 = await crypto.subtle.digest("SHA-256", a2);
    return Array.from(new Uint8Array(b5)).map(c2 => c2.toString(16).padStart(2, "0")).join("");
}

async function n1() {
    const m1 = document.getElementById("passphrase-input").value + c1;
    const k1 = await x1(m1);

    if (k1 === a1) {
        document.getElementById("passphrase-overlay").style.display = "none";
        document.getElementById("content").classList.remove("hidden");
    } else {
        alert("Incorrect passphrase. Please try again.");
    }
}

document.getElementById("passphrase-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        n1();
    }
});

document.getElementById("submit-btn").addEventListener("click", n1);
