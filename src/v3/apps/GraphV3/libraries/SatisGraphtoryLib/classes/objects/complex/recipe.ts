import gqlType from 'v3/apps/GraphV3/libraries/SatisGraphtoryLib/decorators/gqlType';
import GqlObject from 'v3/apps/GraphV3/libraries/SatisGraphtoryLib/classes/objects/base/gqlObject';
import dataField, {
  setDataFields
} from 'v3/apps/GraphV3/libraries/SatisGraphtoryLib/decorators/dataField';
import Protoable from 'v3/apps/GraphV3/libraries/SatisGraphtoryLib/classes/objects/interfaces/protoable';
import stripDesc from 'v3/apps/GraphV3/libraries/SatisGraphtoryLib/decorators/stripDesc';
import generateEnum from 'v3/apps/GraphV3/libraries/SatisGraphtoryLib/decorators/generateEnum';
import SatisGraphtoryNode from 'v3/apps/GraphV3/libraries/SatisGraphtoryLib/classes/objects/base/satisGraphtoryNode';

@generateEnum('name')
class Recipe extends GqlObject implements Protoable {
  constructor(props: any) {
    super();
    setDataFields(this, props);
  }

  @dataField('ClassName')
  @gqlType('String!')
  @stripDesc
  public name: string = '';

  @gqlType('String!')
  @dataField('mDisplayName')
  public displayName: string = '';

  @gqlType('Float!')
  @dataField('mManufactoringDuration')
  public manufacturingDuration: number = 0;

  // @gqlType('Float!')
  // @dataField('mManufactoringDuration')
  // public producedIn: SatisGraphtoryNode;

  // ClassName: "Recipe_OreUranium_C"
  // mDisplayName: "Uranium"
  // mIngredients: "((ItemClass=BlueprintGeneratedClass'"/Game/FactoryGame/Resource/RawResources/OreUranium/Desc_OreUranium.Desc_OreUranium_C"',Amount=1))"
  // mProduct: "((ItemClass=BlueprintGeneratedClass'"/Game/FactoryGame/Resource/RawResources/OreUranium/Desc_OreUranium.Desc_OreUranium_C"',Amount=1))"
  // mManufactoringDuration: "2.000000"
  // mManualManufacturingMultiplier: "1.000000"
  // mProducedIn: "(/Game/FactoryGame/Buildable/Factory/Converter/Build_Converter.Build_Converter_C)"
}

export default Recipe;
