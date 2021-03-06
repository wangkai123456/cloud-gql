import { SchemaDirectiveVisitor } from "graphql-tools";
import { defaultFieldResolver } from "graphql";

export class AuthDriective extends SchemaDirectiveVisitor {
  visitObject() {}
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = function(...args) {
      const context = args[2];
      if (!context.currentUser) {
        throw new Error("permissions denied");
      }
      return resolve.apply(this, args);
    };
  }
}
