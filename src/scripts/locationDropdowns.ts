const getFromDropdownList = (
  airport: Airport
): { id: string; label: string }[] => {
  const outputData = [];
  for (const poiIndex in airport.points) {
    const poiData = airport.points[poiIndex];
    if (poiData.name && poiData.location) {
      outputData.push({
        id: poiIndex,
        label: `${poiData.name} (${poiData.location})`
      });
    } else if (poiData.location) {
      outputData.push({
        id: poiIndex,
        label: `${poiData.category} (${poiData.location})`
      });
    } else if (poiData.name) {
      outputData.push({ id: poiIndex, label: poiData.name });
    }
  }
  return outputData;
};

const getToDropdownList = (airport: Airport, category: string): string[] => {
  const outputData: string[] = [];
  for (const poiIndex in airport.points) {
    const poiData = airport.points[poiIndex];
    if (
      poiData.category === category &&
      poiData.name &&
      outputData.indexOf(poiData.name) < 0
    ) {
      outputData.push(poiData.name);
    }
  }
  return outputData.sort();
};

export const fromDropdownList = getFromDropdownList;
export const toDropdownList = getToDropdownList;
