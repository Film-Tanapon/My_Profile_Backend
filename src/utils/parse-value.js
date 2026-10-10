function parseValue(value, type) {
  if (value === undefined) return undefined;
  if (value === null || value === "") return type === "stringArray" ? [] : type === "string" ? "" : null;
  if (type === "color") {
    if (typeof value !== "string" || !/^#[0-9a-f]{6}$/i.test(value)) throw Object.assign(new Error("Color must be a hex color such as #191b29"), { status: 400 });
    return value.toUpperCase();
  }
  if (type === "date") return new Date(value);
  if (type === "int") return Number.parseInt(value, 10);
  if (type === "boolean") return value === true || value === "true";
  if (type === "stringArray") return Array.isArray(value) ? value : String(value).split("\n").map((item) => item.trim()).filter(Boolean);
  return value;
}


module.exports = parseValue;
