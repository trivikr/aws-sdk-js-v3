import { marshall, marshallOptions, unmarshall, unmarshallOptions } from "@aws-sdk/util-dynamodb";

export type KeyNode = {
  key: string;
  children?: KeyNode[] | AllNodes;
};

export type AllNodes = {
  children?: KeyNode[] | AllNodes;
};

const processKeyInObj = (obj: any, keyNode: KeyNode, processFunc: Function) => {
  const { key, children } = keyNode;
  if (!children || (Array.isArray(children) && children.length === 0)) {
    // Leaf of KeyNode, process the key.
    if (obj[key]) {
      if (Array.isArray(obj[key])) {
        obj[key] = obj[key].map(processFunc);
      } else {
        obj[key] = processFunc(obj[key]);
      }
    }
  } else {
    // KeyNode has children
    if (Array.isArray(children)) {
      for (const keyNodeChild of children) {
        if (Array.isArray(obj[key])) {
          obj[key] = obj[key].map((item: any) => processKeyInObj(item, keyNodeChild, processFunc));
        } else {
          obj[key] = processKeyInObj(obj[key], keyNodeChild, processFunc);
        }
      }
    } else {
      // All children need processing.
      if (Array.isArray(obj[key])) {
        obj[key] = obj[key].map((item: any) => processAllKeysInObj(item, children, processFunc));
      } else {
        obj[key] = processAllKeysInObj(obj[key], children, processFunc);
      }
    }
  }
  return obj;
};

const processKeysInObj = (obj: any, keyNodes: KeyNode[], processFunc: Function) => {
  for (const keyNode of keyNodes) {
    obj[keyNode.key] = processKeyInObj(obj, keyNode, processFunc);
  }
  return obj;
};

const processAllKeysInObj = (obj: any, children: KeyNode[] | AllNodes, processFunc: Function) => {
  for (const key of obj) {
    obj[key] = processKeyInObj(obj, { key, children }, processFunc);
  }
  return obj;
};

export const marshallInput = (obj: any, keyNodes: KeyNode[], options?: marshallOptions) => {
  const marshallFunc = (toMarshall: any) => marshall(toMarshall, options);
  return processKeysInObj(obj, keyNodes, marshallFunc);
};

export const unmarshallOutput = (obj: any, keyNodes: KeyNode[], options?: unmarshallOptions) => {
  const unmarshallFunc = (toMarshall: any) => unmarshall(toMarshall, options);
  return processKeysInObj(obj, keyNodes, unmarshallFunc);
};
