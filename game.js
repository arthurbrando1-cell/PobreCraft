// =====================================
// PobreCraft 3D - Game Logic
// =====================================

// Este arquivo vai lidar com:
// - Criação e gerenciamento de blocos
// - Inventário e seleção de itens
// - Sistema de vida e fome
// - Movimentação avançada
// - Interação com mobs (futuros)

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.module.js';
import { getDatabase, ref, set, onValue, onDisconnect } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Global Variables
let scene, player, players = {}, clock, renderer, camera;
let inventory = [{name: 'Grama', id: 1}, {name: 'Pedra', id: 2}, {name:'Madeira', id:3}];
let selectedSlot = 0;

// Sistema de vida e fome
let vida = 20;
let fome = 20;

// Blocos do mundo
let worldBlocks = [];

export function initGame(_scene, _player, _camera, _renderer, _clock) {
  scene = _scene;
  player = _player;
  camera = _camera;
  renderer = _renderer;
  clock = _clock;

  generateWorld();
  setupInventoryUI();
  updateStats();

  animateGame();
}

function generateWorld() {
  const blockGeo = new THREE.BoxGeometry(1,1,1);
  const blockMat = [
    new THREE.MeshStandardMaterial({color:0x00ff00}), // grama
    new THREE.MeshStandardMaterial({color:0x888888}), // pedra
    new THREE.MeshStandardMaterial({color:0x8B4513})  // madeira
  ];

  // Criar chão simples 10x10
  for(let x=-5;x<5;x++){
    for(let z=-5;z<5;z++){
      const mat = blockMat[0];
      const block = new THREE.Mesh(blockGeo, mat);
      block.position.set(x,0,z);
      scene.add(block);
      worldBlocks.push({mesh:block,type:'Grama',x:x,y:0,z:z});
    }
  }
}

function setupInventoryUI(){
  const invDiv = document.getElementById('inventory');
  invDiv.innerHTML = '';
  inventory.forEach((item, i) => {
    const slot = document.createElement('div');
    slot.className = 'slot';
    slot.innerText = item.name;
    if(i===selectedSlot) slot.style.borderColor = '#fff';
    invDiv.appendChild(slot);
  });
}

function updateStats(){
  // Aqui a gente pode atualizar vida e fome na UI
  console.log(`Vida: ${vida} | Fome: ${fome}`);
}

function animateGame(){
  requestAnimationFrame(animateGame);
  const delta = clock.getDelta();

  // Gravidade simples
  if(player.position.y>1) player.position.y -= 9.8*delta;

  renderer.render(scene,camera);
}

// Funções para adicionar/remover blocos, craft, atacar mobs, etc, virão aqui
