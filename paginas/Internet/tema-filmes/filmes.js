let quadros = [];
let numQuadros = 0;

 //-----Cor Aleatoria-----------------------------------------------------------------------------------
function gerarCorAleatoria() {
    const g = 80;
    const r = Math.floor(Math.random() * 105)+150;
    const b = 150;
    const a = 0.875;
    return `rgb(${r}, ${g}, ${b}, ${a})`;
}
function criarQuadro() {
  const texto = prompt("Digite o título do quadro:");
  if (texto) {

    const cor = gerarCorAleatoria();
    const quadro = document.createElement("div");
    quadro.classList.add("quadro");
    quadro.style.width = "210px";
    quadro.style.height = "130px";
    quadro.style.marginLeft = "5px";

    //---------Editar---------------------------------------------------------------------------
    const editar = document.createElement("button");
    editar.textContent = "Editar";
    editar.classList.add("editar")
    editar.addEventListener("click", () =>{
      const divc = document.createElement("div")
      divc.classList.add("centro")
      document.body.appendChild(divc)

      //----Conteudo-----------------------------------------------------------------------------------
      const conteudo = document.createElement("textarea")
      conteudo.classList.add("conteudo")
      divc.appendChild(conteudo);
    })
    //---------------------------------------------------------------------------------------------
    


   
    quadro.style.backgroundColor = cor;

    //-----Excluir------------------------------------------------------------------------------
    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir quadro";
    botaoExcluir.addEventListener("click", () => {
      quadro.remove();
      numQuadros--;
      quadros = quadros.filter((q) => q.titulo !== texto);
      salvarQuadros();
    });

    //-----Criança-----------------------------------------------------------------------------------

    quadro.appendChild(botaoExcluir);
    quadro.appendChild(editar);


    //-------Titulo d Quadro-----------------------------------------------------------------------------
    const titulo = document.createElement("h2");
    titulo.textContent = texto;

    quadro.appendChild(titulo);

    const container = document.querySelector("#tarefas");
    container.style.flexWrap = "wrap";
    container.appendChild(quadro);

    quadros.push({ titulo: texto, cor: cor });
    numQuadros++;

    salvarQuadros();
  }
}


//--------Renderização---------------------------------------------------------------------------------------
function renderizarQuadros() {
  const container = document.querySelector("#tarefas");
  container.style.flexWrap = "wrap";

  quadros.forEach((quadroInfo) => {
    const quadro = document.createElement("div");
    quadro.classList.add("quadro");
    quadro.style.width = "210px";
    quadro.style.height = "130px";
    quadro.style.marginLeft = "5px";
    quadro.style.backgroundColor = quadroInfo.cor;

    const editar = document.createElement("button");
    editar.textContent = "Editar";
    editar.classList.add("editar")
    editar.addEventListener("click", () =>{
      const divc = document.createElement("div")
      divc.classList.add("centro")
      document.body.appendChild(divc)
    })

    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir quadro";
    botaoExcluir.style.color = "white";
    botaoExcluir.addEventListener("click", () => {
      quadro.remove();
      numQuadros--;
      quadros = quadros.filter((q) => q !== quadroInfo);
      salvarQuadros();
    });

    const titulo = document.createElement("h2");
    titulo.textContent = quadroInfo.titulo;


    
    quadro.appendChild(editar);
    quadro.appendChild(botaoExcluir);
    quadro.appendChild(titulo);

    container.appendChild(quadro);
  });
}

//-------Salvar e carregar quadros---------------------------------------------------------------------------

function salvarQuadros() {
  const json = JSON.stringify(quadros);
  localStorage.setItem("quadros", json);
}

function carregarQuadros() {
  fetch('.../quadros.js')
    .then((response) => response.json())
    .then((data) => {
      quadros = data;
      numQuadros = quadros.length;
      renderizarQuadros();
    });

  const quadrosJSON = localStorage.getItem("quadros");
  if (quadrosJSON) {
    quadros = JSON.parse(quadrosJSON);
    numQuadros = quadros.length;
    renderizarQuadros();
  }
}

const botaoCriarQuadro = document.querySelector("#add");
botaoCriarQuadro.addEventListener("click", criarQuadro);

window.addEventListener("load", carregarQuadros);

//-----Excluir tudo----------------------------------------------------------------------------

function excluirall() {
  if (confirm("Tem certeza que deseja excluir todos os quadros?")) {
    const quadros = document.querySelectorAll(".quadro");
    for (let i = 0; i < quadros.length; i++) {
      quadros[i].remove();
    }
    numQuadros = 0;
    quadros.length = 0; 
    localStorage.clear();
  }
}

//-----Outras paginas----------------------------------------------------------------------------

function menu(){
  location.href = "../../menu.html"
}

function qm(){
  location.href = "../../qm.html"
}

function pesquisa(){
  alert("Não está funcionando atualmente");
}

function conta(){
  location.href = "../../conta.html"
}