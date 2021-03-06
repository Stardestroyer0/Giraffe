const typeDefs = `
  type UpgradeTier {
    name: String!
    value: Int!
  }
  type ResourcePacket {
    item: Item!
    itemQuantity: Int!
  }
  type Item {
    name: String!
    icon: String
    hidden: Boolean
  }
  type Recipe {
    id: String! 
    name: String!
    _internalId: Int!
    input: [ResourcePacket]!
    output: [ResourcePacket]!
    machineClass: MachineClass
    alternate: Boolean
    time: Float!
    hidden: Boolean
  }
  
  type MachineClass {
    id: Int! 
    name: String!
    icon: String
    inputs: Int!
    outputs: Int!
    hidden: Boolean
    localOrdering: Int
    recipes: [Recipe]
    hasUpgrades: Boolean
    instances: [MachineInstance]
    tiers: [UpgradeTier]
  }

  type MachineInstance {
    name: String!
    icon: String
    inputs: Int!
    outputs: Int!
    hidden: Boolean
    tier: UpgradeTier!
    power: Float
    speed: Float
    localOrdering: Int
    machineClass: MachineClass
  }

  type Query {
    getMachineClasses: [MachineClass]
    getCraftingMachineClasses: [MachineClass]
    getAllMachineClasses: [MachineClass]
    getMachineClassByName(class_name: String!): MachineClass
    getMachineClassById(class_id: Int!): MachineClass
    getMachineInstances(class_name: String): [MachineClass]
    getRecipeById(recipe_id: Int!): Recipe
    getRecipeByOutputItemId(item_id: Int!): [Recipe]
    getRecipeByInputItemId(item_id: Int!): [Recipe]
    getRecipeByInputItemName(item_name: String!): [Recipe]
    getRecipeByOutputItemName(item_name: String!): [Recipe]
    getRecipes: [Recipe]
  }
`;
// cityWeather(city_name: String! applicable_date: String): CityWeather
export default typeDefs;
