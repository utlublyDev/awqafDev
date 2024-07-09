
using awqaf.Domain;
using awqaf.Dto;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using JHipsterNet.Core.Pagination;
using System.Collections.Generic;

namespace awqaf.Application.Queries
{
    public class OffersCategoriesGetAllByOfferProviderIdQueryHandler : IRequestHandler<OffersCategoriesGetAllByOfferProviderIdQuery, List<CategoriesWithListOffers>>
    {
        private IReadOnlyOffersCategoriesRepository _offersCategoriesRepository;
        private IReadOnlyOffersRepository _offersRepository;

        public OffersCategoriesGetAllByOfferProviderIdQueryHandler(IReadOnlyOffersCategoriesRepository offersCategoriesRepository, IReadOnlyOffersRepository offersRepository)
        {
            _offersCategoriesRepository = offersCategoriesRepository;
            _offersRepository = offersRepository;
        }


        public async Task<List<CategoriesWithListOffers>> Handle(OffersCategoriesGetAllByOfferProviderIdQuery request, CancellationToken cancellationToken)
        {

            var offersCategories = await _offersCategoriesRepository.GetAllOffersCategoriesByOfferProviderId(request.OfferProviderId);

            //loop through the list of offersCategories and get the list of offers for each category
            List<CategoriesWithListOffers> categoriesWithListOffers = new List<CategoriesWithListOffers>();

            foreach (var category in offersCategories)
            {


                var offer = await _offersRepository.getAllOffersByCategoryId(category.Id, request.OfferProviderId);


                CategoriesWithListOffers categoriesWithListOffersItem = new CategoriesWithListOffers(category.OfferCategorieNameInEnglish,category.OfferCategorieNameInArabic, offer);

                categoriesWithListOffers.Add(categoriesWithListOffersItem);
            }


            return categoriesWithListOffers;
        }









    }
}
