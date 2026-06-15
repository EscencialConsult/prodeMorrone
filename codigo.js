/**
 * EJECUTAR ESTA FUNCIÓN UNA VEZ desde el editor de Apps Script
 * Esto insertará los partidos mock en tu Google Sheet para que el API los reconozca.
 */
function seedPartidosPrueba() {
  const matches = [
    { 
      id: 'mock1', 
      api_id: '9991', 
      equipo_local: 'Boca Juniors', 
      equipo_visitante: 'River Plate', 
      estado: 'programado', 
      fecha_partido: new Date(), 
      competencia: 'Copa de Prueba', 
      temporada: '2024' 
    },
    { 
      id: 'mock2', 
      api_id: '9992', 
      equipo_local: 'Real Madrid', 
      equipo_visitante: 'Barcelona', 
      estado: 'programado', 
      fecha_partido: new Date(), 
      competencia: 'Copa de Prueba', 
      temporada: '2024' 
    },
    { 
      id: 'mock3', 
      api_id: '9993', 
      equipo_local: 'Inter Miami', 
      equipo_visitante: 'LA Galaxy', 
      estado: 'programado', 
      fecha_partido: new Date(), 
      competencia: 'Copa de Prueba', 
      temporada: '2024' 
    }
  ];

  const partidosSheet = getSheet_(SHEETS.PARTIDOS);
  
  matches.forEach(m => {
    // Solo lo agrega si no existe ya
    if (!partidosSheet.find(x => x.id === m.id)) {
      appendRow_(SHEETS.PARTIDOS, m);
    }
  });

  Logger.log('✅ Partidos de prueba creados en la hoja.');

  return;
}
