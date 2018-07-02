import { AbstractionVisualCommand } from '../../modules/Abstraction/visualCommand';
import { ApplicationVisualCommand } from '../../modules/Application/visualCommand';
import { ReferenceVisualCommand } from '../../modules/Reference/visualCommand';
import { VisualCommand } from '../../modules/VisualCommands/VisualCommand';

export const defaultVisualCommands: VisualCommand[] = [AbstractionVisualCommand, ApplicationVisualCommand, ReferenceVisualCommand];
