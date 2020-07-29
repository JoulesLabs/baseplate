<?php

namespace App\Infrastructure;

use Illuminate\Database\Eloquent\Model;

abstract class AbstractResourceService
{
    /**
     * @param  $data [Array of attributes]
     * @return Model Instance
     */
    public function create(array $data)
    {
        return $this->model->create($data);
    }
    /**
     * @param $data array of arrays (of attributes)
     * @return Boolean
     */
    public function createMultiple(array $data)
    {
        return $this->model->insert($data);
    }

    /**
     * @param int primaryKey
     * @param array $select
     * @return Model Instance
     */
    public function find(int $primaryKey,array $select = ['*'])
    {
        return $this->model->select($select)->find($primaryKey);
    }
    /**
     * First row of the database table
     * @return Model Instance
     */
    public function first()
    {
        return $this->model->first();
    }
    /**
     * Last row of the database table
     * @return Model Instance
     */
    public function last()
    {
        return $this->model->last();
    }
    /**
     * Order by descend on column `created at`
     * @return Collection
     */
    public function latest()
    {
        return $this->model->latest();
    }
    /**
     * @return Model Collection
     */
    public function all()
    {
        return $this->model->all();
    }

    /**
     * @param  $data array
     * @param $key
     * @param string $column
     * @return Boolean
     */
    public function update(array $data,$key,string $column = 'id')
    {
        return $this->model->where($column,$key)->update($data);
    }
    /**
     * @param $id int
     * @return boolean
     */
    public function delete(int $id)
    {
        return $this->model->delete($id);
    }

    public function updateByModel(Model $model,array $data)
    {
        return $model->update($data);
    }

    public function orderBy(string $column = 'created_at',string $order = 'ASC')
    {
        return $this->model->orderBy($column,$order);
    }
}
