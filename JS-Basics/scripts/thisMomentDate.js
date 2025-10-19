function thisMomentDate() {
  return `${new Date().toLocaleDateString("pt-BR", { weekday: "long" })} (${new Date().toLocaleDateString(
    "pt-BR"
  )}) às ${new Date().toLocaleTimeString("pt-BR")}`;
}

export default thisMomentDate;
