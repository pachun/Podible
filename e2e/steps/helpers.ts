import { by, expect, element } from "detox"

const asyncForEach = async <T>(
  items: T[],
  callback: (item: T, index: number, items: T[]) => Promise<void>,
) => {
  for (let index = 0; index < items.length; index++) {
    await callback(items[index], index, items)
  }
}

export const expectLabelsNotToBeVisible = async (labels: string[]) =>
  await asyncForEach(
    labels,
    async label => await expect(element(by.label(label))).not.toBeVisible(),
  )

export const expectLabelsToBeVisible = async (labels: string[]) =>
  await asyncForEach(
    labels,
    async label => await expect(element(by.label(label))).toBeVisible(),
  )
