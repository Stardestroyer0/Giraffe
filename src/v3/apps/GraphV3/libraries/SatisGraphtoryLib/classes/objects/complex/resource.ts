import gqlType from 'v3/apps/GraphV3/libraries/SatisGraphtoryLib/decorators/gqlType';
import GqlObject from 'v3/apps/GraphV3/libraries/SatisGraphtoryLib/classes/objects/base/gqlObject';
import dataField from 'v3/apps/GraphV3/libraries/SatisGraphtoryLib/decorators/dataField';
import { setDataFields } from 'v3/apps/GraphV3/libraries/SatisGraphtoryLib/decorators/dataFieldUtils/utils';

import Protoable from 'v3/apps/GraphV3/libraries/SatisGraphtoryLib/classes/objects/interfaces/protoable';
import ResourceForm from 'v3/apps/GraphV3/libraries/SatisGraphtoryLib/classes/objects/complex/resourceForms';
import generateEnum from 'v3/apps/GraphV3/libraries/SatisGraphtoryLib/decorators/generateEnum';
import ProtoBufable from 'v3/apps/GraphV3/libraries/SatisGraphtoryLib/classes/objects/abstract/protoBufable';
import stripClassName from 'v3/apps/GraphV3/libraries/SatisGraphtoryLib/decorators/stripClassName';

@generateEnum('name')
class Resource extends GqlObject implements Protoable {
  constructor(props: any) {
    super();
    setDataFields(this, props);
  }

  @dataField('ClassName')
  @gqlType('String!')
  @stripClassName
  public name: string = '';

  @gqlType('String!')
  @dataField('mDisplayName')
  public displayName: string = '';

  @gqlType('String!')
  @dataField('mDescription')
  public description: string = '';

  @gqlType('ResourceFormEnum!')
  @dataField('mForm')
  public resourceForm: ResourceForm = ProtoBufable.NULL;

  @gqlType('Int!')
  @dataField('mResourceSinkPoints')
  public sinkPoints: number = 0;

  @gqlType('Float!')
  @dataField('mEnergyValue')
  public energyValue: number = 0;
}

export default Resource;
