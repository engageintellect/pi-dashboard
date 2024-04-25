import { U as UNINITIALIZED, H as HYDRATION_START, a as HYDRATION_END, P as PassiveDelegatedEvents, r as render, p as push$1, s as setContext, b as pop$1 } from "./index.js";
let base = "";
let assets = base;
const initial = { base, assets };
function override(paths) {
  base = paths.base;
  assets = paths.assets;
}
function reset() {
  base = initial.base;
  assets = initial.assets;
}
function set_assets(path) {
  assets = initial.assets = path;
}
let public_env = {};
let safe_public_env = {};
function set_private_env(environment) {
}
function set_public_env(environment) {
  public_env = environment;
}
function set_safe_public_env(environment) {
  safe_public_env = environment;
}
var is_array = Array.isArray;
var array_from = Array.from;
var is_frozen = Object.isFrozen;
var define_property = Object.defineProperty;
var get_descriptor = Object.getOwnPropertyDescriptor;
var object_prototype = Object.prototype;
var array_prototype = Array.prototype;
var get_prototype_of = Object.getPrototypeOf;
const DERIVED = 1 << 1;
const EFFECT = 1 << 2;
const RENDER_EFFECT = 1 << 3;
const BLOCK_EFFECT = 1 << 4;
const BRANCH_EFFECT = 1 << 5;
const ROOT_EFFECT = 1 << 6;
const UNOWNED = 1 << 7;
const CLEAN = 1 << 8;
const DIRTY = 1 << 9;
const MAYBE_DIRTY = 1 << 10;
const INERT = 1 << 11;
const DESTROYED = 1 << 12;
const EFFECT_RAN = 1 << 13;
const STATE_SYMBOL = Symbol("$state");
function equals(value) {
  return value === this.v;
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a !== null && typeof a === "object" || typeof a === "function";
}
function safe_equals(value) {
  return !safe_not_equal(value, this.v);
}
// @__NO_SIDE_EFFECTS__
function source(value) {
  const source2 = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    reactions: null,
    equals,
    v: value,
    version: 0
  };
  return source2;
}
// @__NO_SIDE_EFFECTS__
function mutable_source(initial_value) {
  const s = /* @__PURE__ */ source(initial_value);
  s.equals = safe_equals;
  if (current_component_context !== null && current_component_context.l !== null) {
    (current_component_context.l.s ??= []).push(s);
  }
  return s;
}
function set(signal, value) {
  var initialized = signal.v !== UNINITIALIZED;
  if (!current_untracking && initialized && current_reaction !== null && is_runes() && (current_reaction.f & DERIVED) !== 0) {
    throw new Error(
      "ERR_SVELTE_UNSAFE_MUTATION"
    );
  }
  if (!signal.equals(value)) {
    signal.v = value;
    signal.version++;
    if (is_runes() && initialized && current_effect !== null && (current_effect.f & CLEAN) !== 0 && (current_effect.f & BRANCH_EFFECT) === 0) {
      if (current_dependencies !== null && current_dependencies.includes(signal)) {
        set_signal_status(current_effect, DIRTY);
        schedule_effect(current_effect);
      } else {
        if (current_untracked_writes === null) {
          set_current_untracked_writes([signal]);
        } else {
          current_untracked_writes.push(signal);
        }
      }
    }
    mark_reactions(signal, DIRTY, true);
  }
  return value;
}
function remove(current) {
  if (is_array(current)) {
    for (var i = 0; i < current.length; i++) {
      var node = current[i];
      if (node.isConnected) {
        node.remove();
      }
    }
  } else if (current.isConnected) {
    current.remove();
  }
}
function push_effect(effect2, parent_effect) {
  var parent_last = parent_effect.last;
  if (parent_last === null) {
    parent_effect.last = parent_effect.first = effect2;
  } else {
    parent_last.next = effect2;
    effect2.prev = parent_last;
    parent_effect.last = effect2;
  }
}
function create_effect(type, fn, sync) {
  var is_root = (type & ROOT_EFFECT) !== 0;
  var effect2 = {
    ctx: current_component_context,
    deps: null,
    dom: null,
    f: type | DIRTY,
    first: null,
    fn,
    last: null,
    next: null,
    parent: is_root ? null : current_effect,
    prev: null,
    teardown: null,
    transitions: null
  };
  if (current_reaction !== null && !is_root) {
    push_effect(effect2, current_reaction);
  }
  if (sync) {
    var previously_flushing_effect = is_flushing_effect;
    try {
      set_is_flushing_effect(true);
      execute_effect(effect2);
      effect2.f |= EFFECT_RAN;
    } finally {
      set_is_flushing_effect(previously_flushing_effect);
    }
  } else {
    schedule_effect(effect2);
  }
  return effect2;
}
function effect_root(fn) {
  const effect2 = create_effect(ROOT_EFFECT, fn, true);
  return () => {
    destroy_effect(effect2);
  };
}
function effect(fn) {
  return create_effect(EFFECT, fn, false);
}
function branch(fn) {
  return create_effect(RENDER_EFFECT | BRANCH_EFFECT, fn, true);
}
function execute_effect_teardown(effect2) {
  var teardown = effect2.teardown;
  if (teardown !== null) {
    try {
      teardown.call(null);
    } finally {
    }
  }
}
function destroy_effect(effect2) {
  var dom = effect2.dom;
  if (dom !== null) {
    remove(dom);
  }
  destroy_effect_children(effect2);
  remove_reactions(effect2, 0);
  set_signal_status(effect2, DESTROYED);
  if (effect2.transitions) {
    for (const transition of effect2.transitions) {
      transition.stop();
    }
  }
  execute_effect_teardown(effect2);
  var parent = effect2.parent;
  if (parent !== null && (effect2.f & BRANCH_EFFECT) !== 0 && parent.first !== null) {
    var previous = effect2.prev;
    var next = effect2.next;
    if (previous !== null) {
      if (next !== null) {
        previous.next = next;
        next.prev = previous;
      } else {
        previous.next = null;
        parent.last = previous;
      }
    } else if (next !== null) {
      next.prev = null;
      parent.first = next;
    } else {
      parent.first = null;
      parent.last = null;
    }
  }
  effect2.next = effect2.prev = effect2.teardown = effect2.ctx = effect2.dom = effect2.deps = effect2.parent = // @ts-expect-error
  effect2.fn = null;
}
function flush_tasks() {
}
function destroy_derived_children(signal) {
  destroy_effect_children(signal);
  var deriveds = signal.deriveds;
  if (deriveds !== null) {
    signal.deriveds = null;
    for (var i = 0; i < deriveds.length; i += 1) {
      destroy_derived(deriveds[i]);
    }
  }
}
function update_derived(derived, force_schedule) {
  destroy_derived_children(derived);
  var value = execute_reaction_fn(derived);
  var status = (current_skip_reaction || (derived.f & UNOWNED) !== 0) && derived.deps !== null ? MAYBE_DIRTY : CLEAN;
  set_signal_status(derived, status);
  if (!derived.equals(value)) {
    derived.v = value;
    mark_reactions(derived, DIRTY, force_schedule);
  }
}
function destroy_derived(signal) {
  destroy_derived_children(signal);
  remove_reactions(signal, 0);
  set_signal_status(signal, DESTROYED);
  signal.first = signal.last = signal.deps = signal.reactions = // @ts-expect-error `signal.fn` cannot be `null` while the signal is alive
  signal.fn = null;
}
function effect_update_depth_exceeded() {
  {
    throw new Error("effect_update_depth_exceeded");
  }
}
const FLUSH_MICROTASK = 0;
const FLUSH_SYNC = 1;
let current_scheduler_mode = FLUSH_MICROTASK;
let is_micro_task_queued = false;
let is_flushing_effect = false;
function set_is_flushing_effect(value) {
  is_flushing_effect = value;
}
let current_queued_root_effects = [];
let flush_count = 0;
let current_reaction = null;
let current_effect = null;
let current_dependencies = null;
let current_dependencies_index = 0;
let current_untracked_writes = null;
function set_current_untracked_writes(value) {
  current_untracked_writes = value;
}
let current_untracking = false;
let current_skip_reaction = false;
let current_component_context = null;
function is_runes() {
  return current_component_context !== null && current_component_context.l === null;
}
function check_dirtiness(reaction) {
  var flags = reaction.f;
  if ((flags & DIRTY) !== 0) {
    return true;
  }
  if ((flags & MAYBE_DIRTY) !== 0) {
    var dependencies = reaction.deps;
    var is_unowned = (flags & UNOWNED) !== 0;
    if (dependencies !== null) {
      var length = dependencies.length;
      for (var i = 0; i < length; i++) {
        var dependency = dependencies[i];
        if (check_dirtiness(
          /** @type {import('#client').Derived} */
          dependency
        )) {
          update_derived(
            /** @type {import('#client').Derived} **/
            dependency,
            true
          );
          if ((reaction.f & DIRTY) !== 0) {
            return true;
          }
        }
        var version = dependency.version;
        if (is_unowned) {
          if (version > /** @type {import('#client').Derived} */
          reaction.version) {
            reaction.version = version;
            return true;
          } else if (!current_skip_reaction && !dependency?.reactions?.includes(reaction)) {
            var reactions = dependency.reactions;
            if (reactions === null) {
              dependency.reactions = [reaction];
            } else {
              reactions.push(reaction);
            }
          }
        }
      }
    }
    if (!is_unowned) {
      set_signal_status(reaction, CLEAN);
    }
  }
  return false;
}
function execute_reaction_fn(signal) {
  const previous_dependencies = current_dependencies;
  const previous_dependencies_index = current_dependencies_index;
  const previous_untracked_writes = current_untracked_writes;
  const previous_reaction = current_reaction;
  const previous_skip_reaction = current_skip_reaction;
  const previous_untracking = current_untracking;
  current_dependencies = /** @type {null | import('#client').Value[]} */
  null;
  current_dependencies_index = 0;
  current_untracked_writes = null;
  current_reaction = signal;
  current_skip_reaction = !is_flushing_effect && (signal.f & UNOWNED) !== 0;
  current_untracking = false;
  try {
    let res = signal.fn();
    let dependencies = (
      /** @type {import('#client').Value<unknown>[]} **/
      signal.deps
    );
    if (current_dependencies !== null) {
      let i;
      if (dependencies !== null) {
        const deps_length = dependencies.length;
        const full_current_dependencies = current_dependencies_index === 0 ? current_dependencies : dependencies.slice(0, current_dependencies_index).concat(current_dependencies);
        const current_dep_length = full_current_dependencies.length;
        const full_current_dependencies_set = current_dep_length > 16 && deps_length - current_dependencies_index > 1 ? new Set(full_current_dependencies) : null;
        for (i = current_dependencies_index; i < deps_length; i++) {
          const dependency = dependencies[i];
          if (full_current_dependencies_set !== null ? !full_current_dependencies_set.has(dependency) : !full_current_dependencies.includes(dependency)) {
            remove_reaction(signal, dependency);
          }
        }
      }
      if (dependencies !== null && current_dependencies_index > 0) {
        dependencies.length = current_dependencies_index + current_dependencies.length;
        for (i = 0; i < current_dependencies.length; i++) {
          dependencies[current_dependencies_index + i] = current_dependencies[i];
        }
      } else {
        signal.deps = /** @type {import('#client').Value<V>[]} **/
        dependencies = current_dependencies;
      }
      if (!current_skip_reaction) {
        for (i = current_dependencies_index; i < dependencies.length; i++) {
          const dependency = dependencies[i];
          const reactions = dependency.reactions;
          if (reactions === null) {
            dependency.reactions = [signal];
          } else if (reactions[reactions.length - 1] !== signal) {
            reactions.push(signal);
          }
        }
      }
    } else if (dependencies !== null && current_dependencies_index < dependencies.length) {
      remove_reactions(signal, current_dependencies_index);
      dependencies.length = current_dependencies_index;
    }
    return res;
  } finally {
    current_dependencies = previous_dependencies;
    current_dependencies_index = previous_dependencies_index;
    current_untracked_writes = previous_untracked_writes;
    current_reaction = previous_reaction;
    current_skip_reaction = previous_skip_reaction;
    current_untracking = previous_untracking;
  }
}
function remove_reaction(signal, dependency) {
  const reactions = dependency.reactions;
  let reactions_length = 0;
  if (reactions !== null) {
    reactions_length = reactions.length - 1;
    const index = reactions.indexOf(signal);
    if (index !== -1) {
      if (reactions_length === 0) {
        dependency.reactions = null;
      } else {
        reactions[index] = reactions[reactions_length];
        reactions.pop();
      }
    }
  }
  if (reactions_length === 0 && (dependency.f & UNOWNED) !== 0) {
    set_signal_status(dependency, DIRTY);
    remove_reactions(
      /** @type {import('#client').Derived} **/
      dependency,
      0
    );
  }
}
function remove_reactions(signal, start_index) {
  const dependencies = signal.deps;
  if (dependencies !== null) {
    const active_dependencies = start_index === 0 ? null : dependencies.slice(0, start_index);
    let i;
    for (i = start_index; i < dependencies.length; i++) {
      const dependency = dependencies[i];
      if (active_dependencies === null || !active_dependencies.includes(dependency)) {
        remove_reaction(signal, dependency);
      }
    }
  }
}
function destroy_effect_children(signal) {
  let effect2 = signal.first;
  signal.first = null;
  signal.last = null;
  var sibling;
  while (effect2 !== null) {
    sibling = effect2.next;
    destroy_effect(effect2);
    effect2 = sibling;
  }
}
function execute_effect(effect2) {
  var flags = effect2.f;
  if ((flags & DESTROYED) !== 0) {
    return;
  }
  set_signal_status(effect2, CLEAN);
  var component_context = effect2.ctx;
  var previous_effect = current_effect;
  var previous_component_context = current_component_context;
  current_effect = effect2;
  current_component_context = component_context;
  try {
    if ((flags & BLOCK_EFFECT) === 0) {
      destroy_effect_children(effect2);
    }
    execute_effect_teardown(effect2);
    var teardown = execute_reaction_fn(effect2);
    effect2.teardown = typeof teardown === "function" ? teardown : null;
  } finally {
    current_effect = previous_effect;
    current_component_context = previous_component_context;
  }
}
function infinite_loop_guard() {
  if (flush_count > 1e3) {
    flush_count = 0;
    effect_update_depth_exceeded();
  }
  flush_count++;
}
function flush_queued_root_effects(root_effects) {
  for (var i = 0; i < root_effects.length; i++) {
    var signal = root_effects[i];
    flush_nested_effects(signal, RENDER_EFFECT | EFFECT);
  }
}
function flush_queued_effects(effects) {
  var length = effects.length;
  if (length === 0)
    return;
  infinite_loop_guard();
  for (var i = 0; i < length; i++) {
    var effect2 = effects[i];
    if ((effect2.f & (DESTROYED | INERT)) === 0 && check_dirtiness(effect2)) {
      execute_effect(effect2);
    }
  }
}
function process_microtask() {
  is_micro_task_queued = false;
  if (flush_count > 101) {
    return;
  }
  const previous_queued_root_effects = current_queued_root_effects;
  current_queued_root_effects = [];
  flush_queued_root_effects(previous_queued_root_effects);
  if (!is_micro_task_queued) {
    flush_count = 0;
  }
}
function schedule_effect(signal) {
  if (current_scheduler_mode === FLUSH_MICROTASK) {
    if (!is_micro_task_queued) {
      is_micro_task_queued = true;
      queueMicrotask(process_microtask);
    }
  }
  var effect2 = signal;
  while (effect2.parent !== null) {
    effect2 = effect2.parent;
    var flags = effect2.f;
    if ((flags & BRANCH_EFFECT) !== 0) {
      if ((flags & CLEAN) === 0)
        return;
      set_signal_status(effect2, MAYBE_DIRTY);
    }
  }
  current_queued_root_effects.push(effect2);
}
function process_effects(effect2, filter_flags, shallow, collected_effects) {
  var current_effect2 = effect2.first;
  var effects = [];
  main_loop:
    while (current_effect2 !== null) {
      var flags = current_effect2.f;
      var is_active = (flags & (DESTROYED | INERT)) === 0;
      var is_branch = flags & BRANCH_EFFECT;
      var is_clean = (flags & CLEAN) !== 0;
      var child = current_effect2.first;
      if (is_active && (!is_branch || !is_clean)) {
        if (is_branch) {
          set_signal_status(current_effect2, CLEAN);
        }
        if ((flags & RENDER_EFFECT) !== 0) {
          if (is_branch) {
            if (!shallow && child !== null) {
              current_effect2 = child;
              continue;
            }
          } else {
            if (check_dirtiness(current_effect2)) {
              execute_effect(current_effect2);
              child = current_effect2.first;
            }
            if (!shallow && child !== null) {
              current_effect2 = child;
              continue;
            }
          }
        } else if ((flags & EFFECT) !== 0) {
          if (is_branch || is_clean) {
            if (!shallow && child !== null) {
              current_effect2 = child;
              continue;
            }
          } else {
            effects.push(current_effect2);
          }
        }
      }
      var sibling = current_effect2.next;
      if (sibling === null) {
        let parent = current_effect2.parent;
        while (parent !== null) {
          if (effect2 === parent) {
            break main_loop;
          }
          var parent_sibling = parent.next;
          if (parent_sibling !== null) {
            current_effect2 = parent_sibling;
            continue main_loop;
          }
          parent = parent.parent;
        }
      }
      current_effect2 = sibling;
    }
  if (effects.length > 0) {
    if ((filter_flags & EFFECT) !== 0) {
      collected_effects.push(...effects);
    }
    if (!shallow) {
      for (var i = 0; i < effects.length; i++) {
        process_effects(effects[i], filter_flags, false, collected_effects);
      }
    }
  }
}
function flush_nested_effects(effect2, filter_flags, shallow = false) {
  var collected_effects = [];
  var previously_flushing_effect = is_flushing_effect;
  is_flushing_effect = true;
  try {
    if (effect2.first === null && (effect2.f & BRANCH_EFFECT) === 0) {
      flush_queued_effects([effect2]);
    } else {
      process_effects(effect2, filter_flags, shallow, collected_effects);
      flush_queued_effects(collected_effects);
    }
  } finally {
    is_flushing_effect = previously_flushing_effect;
  }
}
function flush_sync(fn, flush_previous = true) {
  var previous_scheduler_mode = current_scheduler_mode;
  var previous_queued_root_effects = current_queued_root_effects;
  try {
    infinite_loop_guard();
    const root_effects = [];
    current_scheduler_mode = FLUSH_SYNC;
    current_queued_root_effects = root_effects;
    if (flush_previous) {
      flush_queued_root_effects(previous_queued_root_effects);
    }
    var result = fn?.();
    flush_tasks();
    if (current_queued_root_effects.length > 0 || root_effects.length > 0) {
      flush_sync();
    }
    flush_count = 0;
    return result;
  } finally {
    current_scheduler_mode = previous_scheduler_mode;
    current_queued_root_effects = previous_queued_root_effects;
  }
}
function get(signal) {
  const flags = signal.f;
  if ((flags & DESTROYED) !== 0) {
    return signal.v;
  }
  if (current_reaction !== null && (current_reaction.f & (BRANCH_EFFECT | ROOT_EFFECT)) === 0 && !current_untracking) {
    const unowned = (current_reaction.f & UNOWNED) !== 0;
    const dependencies = current_reaction.deps;
    if (current_dependencies === null && dependencies !== null && dependencies[current_dependencies_index] === signal && !(unowned && current_effect !== null)) {
      current_dependencies_index++;
    } else if (dependencies === null || current_dependencies_index === 0 || dependencies[current_dependencies_index - 1] !== signal) {
      if (current_dependencies === null) {
        current_dependencies = [signal];
      } else {
        current_dependencies.push(signal);
      }
    }
    if (current_untracked_writes !== null && current_effect !== null && (current_effect.f & CLEAN) !== 0 && (current_effect.f & BRANCH_EFFECT) === 0 && current_untracked_writes.includes(signal)) {
      set_signal_status(current_effect, DIRTY);
      schedule_effect(current_effect);
    }
  }
  if ((flags & DERIVED) !== 0 && check_dirtiness(
    /** @type {import('#client').Derived} */
    signal
  )) {
    {
      update_derived(
        /** @type {import('#client').Derived} **/
        signal,
        false
      );
    }
  }
  return signal.v;
}
function mark_reactions(signal, to_status, force_schedule) {
  var reactions = signal.reactions;
  if (reactions === null)
    return;
  var runes = is_runes();
  var length = reactions.length;
  for (var i = 0; i < length; i++) {
    var reaction = reactions[i];
    if ((!force_schedule || !runes) && reaction === current_effect) {
      continue;
    }
    var flags = reaction.f;
    set_signal_status(reaction, to_status);
    var maybe_dirty = (flags & MAYBE_DIRTY) !== 0;
    var unowned = (flags & UNOWNED) !== 0;
    if ((flags & CLEAN) !== 0 || maybe_dirty && unowned) {
      if ((reaction.f & DERIVED) !== 0) {
        mark_reactions(
          /** @type {import('#client').Derived} */
          reaction,
          MAYBE_DIRTY,
          force_schedule
        );
      } else {
        schedule_effect(
          /** @type {import('#client').Effect} */
          reaction
        );
      }
    }
  }
}
function untrack(fn) {
  const previous_untracking = current_untracking;
  try {
    current_untracking = true;
    return fn();
  } finally {
    current_untracking = previous_untracking;
  }
}
const STATUS_MASK = ~(DIRTY | MAYBE_DIRTY | CLEAN);
function set_signal_status(signal, status) {
  signal.f = signal.f & STATUS_MASK | status;
}
function push(props, runes = false, fn) {
  current_component_context = {
    p: current_component_context,
    c: null,
    e: null,
    m: false,
    s: props,
    x: null,
    l: null
  };
  if (!runes) {
    current_component_context.l = {
      s: null,
      u: null,
      r1: [],
      r2: /* @__PURE__ */ source(false)
    };
  }
}
function pop(component) {
  const context_stack_item = current_component_context;
  if (context_stack_item !== null) {
    if (component !== void 0) {
      context_stack_item.x = component;
    }
    const effects = context_stack_item.e;
    if (effects !== null) {
      context_stack_item.e = null;
      for (let i = 0; i < effects.length; i++) {
        effect(effects[i]);
      }
    }
    current_component_context = context_stack_item.p;
    context_stack_item.m = true;
  }
  return component || /** @type {T} */
  {};
}
function proxy(value, immutable = true, parent = null) {
  if (typeof value === "object" && value != null && !is_frozen(value)) {
    if (STATE_SYMBOL in value) {
      const metadata = (
        /** @type {import('#client').ProxyMetadata<T>} */
        value[STATE_SYMBOL]
      );
      if (metadata.t === value || metadata.p === value) {
        return metadata.p;
      }
    }
    const prototype = get_prototype_of(value);
    if (prototype === object_prototype || prototype === array_prototype) {
      const proxy2 = new Proxy(value, state_proxy_handler);
      define_property(value, STATE_SYMBOL, {
        value: (
          /** @type {import('#client').ProxyMetadata} */
          {
            s: /* @__PURE__ */ new Map(),
            v: /* @__PURE__ */ source(0),
            a: is_array(value),
            i: immutable,
            p: proxy2,
            t: value
          }
        ),
        writable: true,
        enumerable: false
      });
      return proxy2;
    }
  }
  return value;
}
function update_version(signal, d = 1) {
  set(signal, signal.v + d);
}
const state_proxy_handler = {
  defineProperty(target, prop, descriptor) {
    if (descriptor.value) {
      const metadata = target[STATE_SYMBOL];
      const s = metadata.s.get(prop);
      if (s !== void 0)
        set(s, proxy(descriptor.value, metadata.i, metadata));
    }
    return Reflect.defineProperty(target, prop, descriptor);
  },
  deleteProperty(target, prop) {
    const metadata = target[STATE_SYMBOL];
    const s = metadata.s.get(prop);
    const is_array2 = metadata.a;
    const boolean = delete target[prop];
    if (is_array2 && boolean) {
      const ls = metadata.s.get("length");
      const length = target.length - 1;
      if (ls !== void 0 && ls.v !== length) {
        set(ls, length);
      }
    }
    if (s !== void 0)
      set(s, UNINITIALIZED);
    if (boolean) {
      update_version(metadata.v);
    }
    return boolean;
  },
  get(target, prop, receiver) {
    if (prop === STATE_SYMBOL) {
      return Reflect.get(target, STATE_SYMBOL);
    }
    const metadata = target[STATE_SYMBOL];
    let s = metadata.s.get(prop);
    if (s === void 0 && (!(prop in target) || get_descriptor(target, prop)?.writable)) {
      s = (metadata.i ? source : mutable_source)(proxy(target[prop], metadata.i, metadata));
      metadata.s.set(prop, s);
    }
    if (s !== void 0) {
      const value = get(s);
      return value === UNINITIALIZED ? void 0 : value;
    }
    return Reflect.get(target, prop, receiver);
  },
  getOwnPropertyDescriptor(target, prop) {
    const descriptor = Reflect.getOwnPropertyDescriptor(target, prop);
    if (descriptor && "value" in descriptor) {
      const metadata = target[STATE_SYMBOL];
      const s = metadata.s.get(prop);
      if (s) {
        descriptor.value = get(s);
      }
    }
    return descriptor;
  },
  has(target, prop) {
    if (prop === STATE_SYMBOL) {
      return true;
    }
    const metadata = target[STATE_SYMBOL];
    const has = Reflect.has(target, prop);
    let s = metadata.s.get(prop);
    if (s !== void 0 || current_effect !== null && (!has || get_descriptor(target, prop)?.writable)) {
      if (s === void 0) {
        s = (metadata.i ? source : mutable_source)(
          has ? proxy(target[prop], metadata.i, metadata) : UNINITIALIZED
        );
        metadata.s.set(prop, s);
      }
      const value = get(s);
      if (value === UNINITIALIZED) {
        return false;
      }
    }
    return has;
  },
  set(target, prop, value, receiver) {
    const metadata = target[STATE_SYMBOL];
    let s = metadata.s.get(prop);
    if (s === void 0) {
      untrack(() => receiver[prop]);
      s = metadata.s.get(prop);
    }
    if (s !== void 0) {
      set(s, proxy(value, metadata.i, metadata));
    }
    const is_array2 = metadata.a;
    const not_has = !(prop in target);
    if (is_array2 && prop === "length") {
      for (let i = value; i < target.length; i += 1) {
        const s2 = metadata.s.get(i + "");
        if (s2 !== void 0)
          set(s2, UNINITIALIZED);
      }
    }
    target[prop] = value;
    if (not_has) {
      if (is_array2) {
        const ls = metadata.s.get("length");
        const length = target.length;
        if (ls !== void 0 && ls.v !== length) {
          set(ls, length);
        }
      }
      update_version(metadata.v);
    }
    return true;
  },
  ownKeys(target) {
    const metadata = target[STATE_SYMBOL];
    get(metadata.v);
    return Reflect.ownKeys(target);
  }
};
function set_hydrating(value) {
}
function hydrate_anchor(node) {
  if (node.nodeType !== 8) {
    return node;
  }
  var current = (
    /** @type {Node | null} */
    node
  );
  if (
    /** @type {Comment} */
    current?.data !== HYDRATION_START
  ) {
    return node;
  }
  var nodes = [];
  var depth = 0;
  while ((current = /** @type {Node} */
  current.nextSibling) !== null) {
    if (current.nodeType === 8) {
      var data = (
        /** @type {Comment} */
        current.data
      );
      if (data === HYDRATION_START) {
        depth += 1;
      } else if (data[0] === HYDRATION_END) {
        if (depth === 0) {
          return current;
        }
        depth -= 1;
      }
    }
    nodes.push(current);
  }
  throw new Error("Expected a closing hydration marker");
}
var node_prototype;
var element_prototype;
var text_prototype;
var text_content_set;
function init_operations() {
  if (node_prototype !== void 0) {
    return;
  }
  node_prototype = Node.prototype;
  element_prototype = Element.prototype;
  text_prototype = Text.prototype;
  node_prototype.appendChild;
  node_prototype.cloneNode;
  element_prototype.__click = void 0;
  text_prototype.__nodeValue = " ";
  element_prototype.__className = "";
  element_prototype.__attributes = null;
  // @ts-ignore
  get_descriptor(node_prototype, "firstChild").get;
  // @ts-ignore
  get_descriptor(node_prototype, "nextSibling").get;
  text_content_set = /** @type {(this: Node, text: string ) => void} */
  // @ts-ignore
  get_descriptor(node_prototype, "textContent").set;
  // @ts-ignore
  get_descriptor(element_prototype, "className").set;
}
function empty() {
  return document.createTextNode("");
}
function clear_text_content(node) {
  text_content_set.call(node, "");
}
function handle_event_propagation(handler_element, event) {
  var owner_document = handler_element.ownerDocument;
  var event_name = event.type;
  var path = event.composedPath?.() || [];
  var current_target = (
    /** @type {null | Element} */
    path[0] || event.target
  );
  if (event.target !== current_target) {
    define_property(event, "target", {
      configurable: true,
      value: current_target
    });
  }
  var path_idx = 0;
  var handled_at = event.__root;
  if (handled_at) {
    var at_idx = path.indexOf(handled_at);
    if (at_idx !== -1 && (handler_element === document || handler_element === /** @type {any} */
    window)) {
      event.__root = handler_element;
      return;
    }
    var handler_idx = path.indexOf(handler_element);
    if (handler_idx === -1) {
      return;
    }
    if (at_idx <= handler_idx) {
      path_idx = at_idx + 1;
    }
  }
  current_target = /** @type {Element} */
  path[path_idx] || event.target;
  define_property(event, "currentTarget", {
    configurable: true,
    get() {
      return current_target || owner_document;
    }
  });
  function next(current_target2) {
    var parent_element = current_target2.parentNode || /** @type {any} */
    current_target2.host || null;
    try {
      var delegated = current_target2["__" + event_name];
      if (delegated !== void 0 && !/** @type {any} */
      current_target2.disabled) {
        if (is_array(delegated)) {
          var [fn, ...data] = delegated;
          fn.apply(current_target2, [event, ...data]);
        } else {
          delegated.call(current_target2, event);
        }
      }
    } finally {
      if (!event.cancelBubble && parent_element !== handler_element && parent_element !== null && current_target2 !== handler_element) {
        next(parent_element);
      }
    }
  }
  try {
    next(current_target);
  } finally {
    event.__root = handler_element;
    current_target = handler_element;
  }
}
const all_registered_events = /* @__PURE__ */ new Set();
const root_event_handles = /* @__PURE__ */ new Set();
function mount(component, options2) {
  const anchor = options2.anchor ?? options2.target.appendChild(empty());
  return flush_sync(() => _mount(component, { ...options2, anchor }), false);
}
function hydrate(component, options2) {
  const target = options2.target;
  let hydrated = false;
  try {
    return flush_sync(() => {
      set_hydrating(true);
      var node = target.firstChild;
      while (node && (node.nodeType !== 8 || /** @type {Comment} */
      node.data !== HYDRATION_START)) {
        node = node.nextSibling;
      }
      if (!node) {
        throw new Error("Missing hydration marker");
      }
      const anchor = hydrate_anchor(node);
      const instance = _mount(component, { ...options2, anchor });
      set_hydrating(false);
      hydrated = true;
      return instance;
    }, false);
  } catch (error) {
    if (!hydrated && options2.recover !== false) {
      console.error(
        "ERR_SVELTE_HYDRATION_MISMATCH",
        error
      );
      clear_text_content(target);
      return mount(component, options2);
    } else {
      throw error;
    }
  } finally {
  }
}
function _mount(Component, { target, anchor, props = {}, events, context, intro = false }) {
  init_operations();
  const registered_events = /* @__PURE__ */ new Set();
  const bound_event_listener = handle_event_propagation.bind(null, target);
  const bound_document_event_listener = handle_event_propagation.bind(null, document);
  const event_handle = (events2) => {
    for (let i = 0; i < events2.length; i++) {
      const event_name = events2[i];
      if (!registered_events.has(event_name)) {
        registered_events.add(event_name);
        target.addEventListener(
          event_name,
          bound_event_listener,
          PassiveDelegatedEvents.includes(event_name) ? {
            passive: true
          } : void 0
        );
        document.addEventListener(
          event_name,
          bound_document_event_listener,
          PassiveDelegatedEvents.includes(event_name) ? {
            passive: true
          } : void 0
        );
      }
    }
  };
  event_handle(array_from(all_registered_events));
  root_event_handles.add(event_handle);
  let component = void 0;
  const unmount2 = effect_root(() => {
    branch(() => {
      if (context) {
        push({});
        var ctx = (
          /** @type {import('#client').ComponentContext} */
          current_component_context
        );
        ctx.c = context;
      }
      if (events) {
        props.$$events = events;
      }
      component = Component(anchor, props) || {};
      if (context) {
        pop();
      }
    });
    return () => {
      for (const event_name of registered_events) {
        target.removeEventListener(event_name, bound_event_listener);
      }
      root_event_handles.delete(event_handle);
      mounted_components.delete(component);
    };
  });
  mounted_components.set(component, unmount2);
  return component;
}
let mounted_components = /* @__PURE__ */ new WeakMap();
function unmount(component) {
  const fn = mounted_components.get(component);
  fn?.();
}
function asClassComponent$1(component) {
  return class extends Svelte4Component {
    /** @param {any} options */
    constructor(options2) {
      super({
        component,
        ...options2
      });
    }
  };
}
class Svelte4Component {
  /** @type {any} */
  #events;
  /** @type {Record<string, any>} */
  #instance;
  /**
   * @param {import('svelte').ComponentConstructorOptions & {
   *  component: any;
   * 	immutable?: boolean;
   * 	hydrate?: boolean;
   * 	recover?: false;
   * }} options
   */
  constructor(options2) {
    const props = proxy({ ...options2.props || {}, $$events: {} }, false);
    this.#instance = (options2.hydrate ? hydrate : mount)(options2.component, {
      target: options2.target,
      props,
      context: options2.context,
      intro: options2.intro,
      recover: options2.recover
    });
    this.#events = props.$$events;
    for (const key of Object.keys(this.#instance)) {
      if (key === "$set" || key === "$destroy" || key === "$on")
        continue;
      define_property(this, key, {
        get() {
          return this.#instance[key];
        },
        /** @param {any} value */
        set(value) {
          this.#instance[key] = value;
        },
        enumerable: true
      });
    }
    this.#instance.$set = /** @param {Record<string, any>} next */
    (next) => {
      Object.assign(props, next);
    };
    this.#instance.$destroy = () => {
      unmount(this.#instance);
    };
  }
  /** @param {Record<string, any>} props */
  $set(props) {
    this.#instance.$set(props);
  }
  /**
   * @param {string} event
   * @param {(...args: any[]) => any} callback
   * @returns {any}
   */
  $on(event, callback) {
    this.#events[event] = this.#events[event] || [];
    const cb = (...args) => callback.call(this, ...args);
    this.#events[event].push(cb);
    return () => {
      this.#events[event] = this.#events[event].filter(
        /** @param {any} fn */
        (fn) => fn !== cb
      );
    };
  }
  $destroy() {
    this.#instance.$destroy();
  }
}
function asClassComponent(component) {
  const component_constructor = asClassComponent$1(component);
  const _render = (props, { context } = {}) => {
    const result = render(component, { props, context });
    return {
      css: { code: "", map: null },
      head: result.head,
      html: result.html
    };
  };
  component_constructor.render = _render;
  return component_constructor;
}
let prerendering = false;
function set_building() {
}
function set_prerendering() {
  prerendering = true;
}
function Root($$payload, $$props) {
  push$1();
  let {
    stores,
    page,
    constructors,
    components = [],
    form,
    data_0 = null,
    data_1 = null
  } = $$props;
  {
    setContext("__svelte__", stores);
  }
  {
    stores.page.set(page);
  }
  $$payload.out += `<!--[-->`;
  if (constructors[1]) {
    $$payload.out += `<!--[-->`;
    constructors[0]?.($$payload, {
      data: data_0,
      children: ($$payload2, $$slotProps) => {
        $$payload2.out += `<!--[-->`;
        constructors[1]?.($$payload2, { data: data_1, form });
        $$payload2.out += `<!--]-->`;
      }
    });
    $$payload.out += `<!--]-->`;
    $$payload.out += "<!--]-->";
  } else {
    $$payload.out += `<!--[-->`;
    constructors[0]?.($$payload, { data: data_0, form });
    $$payload.out += `<!--]-->`;
    $$payload.out += "<!--]!-->";
  }
  $$payload.out += ` <!--[-->`;
  {
    $$payload.out += "<!--]!-->";
  }
  pop$1();
}
const root = asClassComponent(Root);
function set_read_implementation(fn) {
}
function set_manifest(_) {
}
const options = {
  app_dir: "_app",
  app_template_contains_nonce: false,
  csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false }, "reportOnly": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
  csrf_check_origin: true,
  embedded: false,
  env_public_prefix: "PUBLIC_",
  env_private_prefix: "",
  hooks: null,
  // added lazily, via `get_hooks`
  preload_strategy: "modulepreload",
  root,
  service_worker: false,
  templates: {
    app: ({ head, body, assets: assets2, nonce, env }) => '<!doctype html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<link rel="icon" href="' + assets2 + '/favicon.png" />\n		<meta name="viewport" content="width=device-width, initial-scale=1" />\n		' + head + '\n	</head>\n	<body data-sveltekit-preload-data="hover">\n		<div style="display: contents">' + body + "</div>\n	</body>\n</html>\n",
    error: ({ status, message }) => '<!doctype html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<title>' + message + `</title>

		<style>
			body {
				--bg: white;
				--fg: #222;
				--divider: #ccc;
				background: var(--bg);
				color: var(--fg);
				font-family:
					system-ui,
					-apple-system,
					BlinkMacSystemFont,
					'Segoe UI',
					Roboto,
					Oxygen,
					Ubuntu,
					Cantarell,
					'Open Sans',
					'Helvetica Neue',
					sans-serif;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100vh;
				margin: 0;
			}

			.error {
				display: flex;
				align-items: center;
				max-width: 32rem;
				margin: 0 1rem;
			}

			.status {
				font-weight: 200;
				font-size: 3rem;
				line-height: 1;
				position: relative;
				top: -0.05rem;
			}

			.message {
				border-left: 1px solid var(--divider);
				padding: 0 0 0 1rem;
				margin: 0 0 0 1rem;
				min-height: 2.5rem;
				display: flex;
				align-items: center;
			}

			.message h1 {
				font-weight: 400;
				font-size: 1em;
				margin: 0;
			}

			@media (prefers-color-scheme: dark) {
				body {
					--bg: #222;
					--fg: #ddd;
					--divider: #666;
				}
			}
		</style>
	</head>
	<body>
		<div class="error">
			<span class="status">` + status + '</span>\n			<div class="message">\n				<h1>' + message + "</h1>\n			</div>\n		</div>\n	</body>\n</html>\n"
  },
  version_hash: "1kkulvd"
};
async function get_hooks() {
  return {};
}
export {
  assets as a,
  base as b,
  options as c,
  set_private_env as d,
  prerendering as e,
  set_public_env as f,
  get_hooks as g,
  set_safe_public_env as h,
  set_assets as i,
  set_building as j,
  set_manifest as k,
  set_prerendering as l,
  set_read_implementation as m,
  override as o,
  public_env as p,
  reset as r,
  safe_public_env as s
};
