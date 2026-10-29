
const formulario = document.getElementById("formNotas");
const resultado = document.getElementById("resultado");
const botaoLimpar = document.getElementById("limpar");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const campo1 = document.getElementById("nota1").value;
    const campo2 = document.getElementById("nota2").value;
    const campo3 = document.getElementById("nota3").value;

    if (nome === "") {
        mostrarErro("Digite o nome do estudante.");
        return;
    }

    if (campo1 === "" || campo2 === "" || campo3 === "") {
        mostrarErro("Preencha todas as notas.");
        return;
    }

    const nota1 = Number(campo1);
    const nota2 = Number(campo2);
    const nota3 = Number(campo3);

    if (
        !Number.isFinite(nota1) ||
        !Number.isFinite(nota2) ||
        !Number.isFinite(nota3) ||
        nota1 < 0 || nota1 > 10 ||
        nota2 < 0 || nota2 > 10 ||
        nota3 < 0 || nota3 > 10
    ) {
        mostrarErro("As notas devem estar entre 0 e 10.");
        return;
    }

    const media = (nota1 + nota2 + nota3) / 3;
    let situacao;

    if (media >= 7) {
        situacao = "Aprovado(a)";
    } else if (media >= 5) {
        situacao = "Recuperação";
    } else {
        situacao = "Reprovado(a)";
    }

    resultado.className = "sucesso";
    resultado.innerHTML = `
        <h2>Resultado do estudante</h2>
        <p><strong>Nome:</strong> ${escaparHTML(nome)}</p>
        <p><strong>Média:</strong> ${media.toFixed(2).replace(".", ",")}</p>
        <p><strong>Situação:</strong> ${situacao}</p>
    `;
});

function mostrarErro(mensagem) {
    resultado.className = "erro";
    resultado.textContent = mensagem;
}

function escaparHTML(texto) {
    return texto.replace(/[&<>"']/g, function(caractere) {
        const entidades = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entidades[caractere];
    });
}

botaoLimpar.addEventListener("click", function() {
    formulario.reset();
    resultado.innerHTML = "";
    resultado.className = "";
});
