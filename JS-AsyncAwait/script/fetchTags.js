export async function fetchTags() {
  const res = await fetch("script/tags.json");
  if (!res.ok) {
    throw new Error("HTTP error, status", res.status);
  }
  const resJson = await res.json();
  return resJson;
}

//to add to index
//this version of fetchTags is more compatible to older browsers and scripts that aren't type module
// fetchTags()
//   .then((tags) => {
//     possibleTags = tags;
//     addDataListOptions(tags, tagDataList);
//   })
//   .catch((error) => {
//     console.error("Error fetching tags:", error);
//   });
