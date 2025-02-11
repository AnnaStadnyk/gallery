<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\File;
use Illuminate\Validation\ValidationException;

class ImageController extends Controller
{
    public function index()
    {
        $images = Auth::user()->images()->orderBy('id', 'desc')->paginate(3)
            ->through(function ($image) { // through map + paginate instead get
                return [
                    'id' => $image->id,
                    'src' => asset('storage/' . $image->src),
                    'description' => $image->description,
                    'can' => ['delete' => Auth::user()->can('delete-image', $image)]
                ];
            });

        return response()->json($images);
    }

    public function store(Request $request)
    {
        // $attributes = $request->validate([
        //     'images' => ['required', File::types(['png', 'jpeg', 'webp'])],
        //     'description' => ['nullable', 'max:1000']
        // ]);
        // $imgPath = $request->file('images')->store();

        // unset($attributes['images']);

        // $attributes['src'] = $imgPath;

        // $image = Auth::user()->images()->create($attributes);

        // return response()->json([
        //     'id' => $image->id,
        //     'src' => $image->src,
        //     'description' => $image->description
        // ]);

        //     $request->validate([
        //         'images' => 'required|array',
        //         'images.*' => ['required', 'file', 'image', 'mimes:jpeg,png,jpg'],
        //         'description' => ['nullable', 'string', 'max:255'],
        //     ]);

        // try {
        //     $images = DB::transaction(function () use ($request) {
        //         $images = [];
        //         foreach ($request->file('images') as $file) {
        //             $imgPath = $file->store('albums');

        //             $images[] = Auth::user()->images()->create([
        //                 'src' => $imgPath,
        //                 'description' => $request->description
        //             ]);
        //         }
        //         return $images;
        //     });

        //     $images = array_map(function ($image) {
        //         return [
        //             'id' => $image->id,
        //             'src' => $image->src,
        //             'description' => $image->description
        //         ];
        //     }, $images);

        //     return response()->json($images, 201);
        // } catch (Exception $e) {
        //     return response()->json(500);
        // }

        $request->validate(
            [
                'files' => ['required', 'array'],
                'files.*' => ['image', 'mimes:png,jpg,webp', 'max:3072'],
                'description' => ['nullable', 'string', 'min:3', 'max:255'],
            ],
            $messages = [
                'files' => 'The image field is required.',
                'files.*.mimes' => 'Only PNG, JPG, WEBP file type are allowed.',
                'files.*.max' => 'Only up to 10MB file is allowed.',
            ]
        );
        try {
            DB::transaction(function () use ($request) {

                foreach ($request->file('files') as $file) {
                    $imgPath = $file->store('albums');

                    Auth::user()->images()->create([
                        'src' => $imgPath,
                        'description' => $request->description
                    ]);
                }
            });

            return response()->json(status: 201);
        } catch (Exception $e) {
            return response()->json(status: 500);
        }
    }

    public function destroy(Image $image)
    {
        // if (! Gate::allows('delete-image', $image)) {
        //     abort(403);
        // }

        $image->delete();

        session()->flash('message', 'An image has been deleted successfully.');

        return response()->noContent();
    }
}
