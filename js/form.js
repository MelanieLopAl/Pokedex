//form
const addButton = document.getElementById('addButton');

addButton.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = editForm.name.value;
  const description = editForm.description.value;
  const typeCheckboxes = editForm.querySelectorAll('input[name="type"]:checked');
  const type = Array.from(typeCheckboxes).map(checkbox => checkbox.value);
  const debilidades = editForm.debilidades.value;
  const evolution = editForm.evolution.value;

  const newPokemon = {
    name: name,
    description: description,
    type: type,
    debilidades: debilidades,
    evolution: evolution
    // Aquí también puedes incluir la imagen si es necesario
  };

  try {
    const response = await fetch('/Pokemon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPokemon)
    });

    if (response.ok) {
      const responseData = await response.json();
      responseData
      alert('Pokémon añadido exitosamente.');
      // Redirige o actualiza la lista de Pokémon si es necesario
    } else {
      const responseData = await response.json();
      alert(`Error al añadir el Pokémon: ${responseData.message}`);
    }
  } catch (error) {
    console.error('Error al realizar la solicitud:', error);
  }
});

module.exports = {
    addButton
}