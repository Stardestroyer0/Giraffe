import * as protobuf from 'protobufjs/light';
import MachineNode, { GraphNode } from '../../datatypes/graph/graphNode';
import { b64fromBuffer, ErrMsg, validB64Chars } from '@waiting/base64';
import * as LZUTF8 from 'lzutf8';
import { toUint8Array } from '@waiting/base64/dist/lib/to_buffer';

type saveFile = {
  edges: any;
  nodes: any;
};

function toString(num: number) {
  let numStr = String(num);

  if (Math.abs(num) < 1.0) {
    let e = parseInt(num.toString().split('e-')[1]);
    if (e) {
      let negative = num < 0;
      if (negative) num *= -1;
      num *= Math.pow(10, e - 1);
      numStr = '0.' + new Array(e).join('0') + num.toString().substring(2);
      if (negative) numStr = '-' + numStr;
    }
  } else {
    let e = parseInt(num.toString().split('+')[1]);
    if (e > 20) {
      e -= 20;
      num /= Math.pow(10, e);
      numStr = num.toString() + new Array(e + 1).join('0');
    }
  }

  return numStr;
}

function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

const serializeNode = (
  node: GraphNode,
  serializer: any,
  enumMapper: any,
  flagger: any
) => {
  const data: any = node.serialize();

  const mappedEnums: any = {};

  Object.keys(enumMapper).forEach(fieldName => {
    const fetchedData = data[fieldName];

    if (fetchedData !== null && fetchedData !== undefined) {
      mappedEnums[fieldName] = enumMapper[fieldName](fetchedData);

      const flagFieldName = flagger[fieldName];
      if (flagFieldName !== null && flagFieldName !== undefined) {
        mappedEnums[flagFieldName] = true;
      }
    } else {
      const flagFieldName = flagger[fieldName];
      mappedEnums[flagFieldName] = false;
    }
  });

  const finalMapping = Object.assign({}, data, mappedEnums);

  const verify = serializer.verify(finalMapping);

  if (verify) {
    throw new Error('Serializer error: ' + verify);
  }

  return finalMapping;
};

const serializeEdgesFromNodes = (nodes: GraphNode[], serializer: any) => {
  return [];
};

const dataMapper = (root: any, enumName: string) => {
  const classData = root.lookupEnum(enumName);

  return {
    toEnum: (data: string) => classData.values[data],
    fromEnum: (enm: number) => classData.valuesById[enm]
  };
};

function parseDecodeInputBase64(base64: string): string {
  if (!validB64Chars(base64)) {
    throw new TypeError(ErrMsg.notValidB64String);
  }

  return base64;
}

const serialize = (schema: any, graph: saveFile) => {
  const root = protobuf.Root.fromJSON(schema);

  const Node = root.lookupType('Node');
  // const Edge = root.lookupType('Edge');

  const MachineClass = dataMapper(root, 'MachineClass');
  const UpgradeTiers = dataMapper(root, 'UpgradeTiers');
  const Recipe = dataMapper(root, 'Recipe');

  const nodes = [];

  for (let i = 0; i < 1000; i++) {
    nodes.push(new MachineNode(0, 0, 300, 500));
  }

  const nodeEnumMapper = {
    machineClass: MachineClass.toEnum,
    recipe: Recipe.toEnum,
    tier: UpgradeTiers.toEnum,
    inputSlots: () => null,
    outputSlots: () => null
  };

  const nodeEnumFlagger = {
    recipe: 'hasRecipe'
  };

  const serializedNodes = nodes.map(node =>
    serializeNode(node, Node, nodeEnumMapper, nodeEnumFlagger)
  );

  const serializedEdges = serializeEdgesFromNodes(nodes, null);
  // We must serialize the edges from the nodes, since in the future we may only
  // need to serialize portions of the nodes + edges.

  const SaveFile = root.lookupType('SaveFile');
  const buffer = SaveFile.encode({
    edges: serializedEdges,
    nodes: serializedNodes
  }).finish();

  console.time('compress');

  const encodedText = b64fromBuffer(buffer);

  const compressedEncoding = LZUTF8.compress(encodedText);

  const furtherEncoding = b64fromBuffer(compressedEncoding);
  //
  const furtherCompressedEncoding = LZUTF8.compress(furtherEncoding);
  //
  console.timeEnd('compress');
  console.time('decompress');

  const decompressedEncoding = LZUTF8.decompress(furtherCompressedEncoding);

  const str = parseDecodeInputBase64(decompressedEncoding);
  const u8arr = toUint8Array(str);

  const decompressedEncoding2 = LZUTF8.decompress(u8arr);

  const str2 = parseDecodeInputBase64(decompressedEncoding2);
  const u8arr2 = toUint8Array(str2);

  console.log(u8arr2);
  console.log(buffer);

  const originalJSON = JSON.stringify({
    edges: serializedEdges,
    nodes: serializedNodes
  });

  console.log('Total JSON size: ' + formatBytes(originalJSON.length * 8));
  console.log(
    'Total serialized size: ' + formatBytes(compressedEncoding.length * 8)
  );
  console.log('Adding this would cost $' + toString(0.05 / 10000));
  console.log('Updating this would cost $' + toString(0.05 / 10000));
  console.log(
    'Storing this per month would cost $' +
      toString((compressedEncoding.length / 1000000000) * 0.12)
  );
  const num_reads = 2000;
  console.log(
    'Assuming ' +
      num_reads +
      ' reads $' +
      toString((0.0004 / 10000) * num_reads)
  );
  console.log(
    'Which means this can be read ' +
      toString(1 / (0.0004 / 10000)) +
      ' times for $1'
  );
};

export default serialize;
