/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { AxiosError } from "axios";

interface BaseEntity {
  _id: string;
  [key: string]: any; // Allow additional dynamic fields
}

type EntityState<T> = {
  entities: T[] | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  loading: boolean;
};

type EntityActions<T> = {
  fetchEntities: () => Promise<void>;
  addEntity: (entity: T) => Promise<void>;
  updateEntity: (id: string, entity: Partial<T>) => Promise<void>;
  deleteEntity: (id: string) => Promise<void>;
};

type EntityStore<T> = EntityState<T> & EntityActions<T>;

export const createEntityStore = <T extends BaseEntity>(service: any) =>
  create<EntityStore<T>>((set) => ({
    entities: null,
    status: "idle",
    error: null,
    loading: false,

    // Fetch all entities
    fetchEntities: async () => {
      set({ loading: true, status: "loading", error: null });
      try {
        const response = await service.getAll();
        set({
          loading: false,
          entities: response.data,
          status: "succeeded",
        });
      } catch (error) {
        set({
          loading: false,
          status: "failed",
          error: (error as AxiosError).message,
        });
        throw error;
      }
    },

    // Add a new entity
    addEntity: async (entity: T) => {
      set({ loading: true, status: "loading", error: null });
      try {
        const response = await service.create(entity);
        set((state) => ({
          loading: false,
          status: "succeeded",
          entities: [...(state.entities ?? []), response.data],
        }));
      } catch (error) {
        set({
          loading: false,
          status: "failed",
          error: (error as AxiosError).message,
        });
        throw error;
      }
    },

    // Update an existing entity
    updateEntity: async (id: string, entity: Partial<T>) => {
      set({ loading: true, status: "loading", error: null });
      try {
        const response = await service.update(id, entity);
        set((state) => ({
          loading: false,
          status: "succeeded",
          entities: state.entities?.map((item) =>
            item._id === id ? { ...item, ...response.data } : item
          ),
        }));
      } catch (error) {
        set({
          loading: false,
          status: "failed",
          error: (error as AxiosError).message,
        });
        throw error;
      }
    },

    // Delete an entity
    deleteEntity: async (id: string) => {
      set({ loading: true, status: "loading", error: null });
      try {
        await service.delete(id);
        set((state) => ({
          loading: false,
          status: "succeeded",
          entities: state.entities?.filter((item) => item._id !== id),
        }));
      } catch (error) {
        set({
          loading: false,
          status: "failed",
          error: (error as AxiosError).message,
        });
        throw error;
      }
    },
  }));
