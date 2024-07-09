
using awqaf.Domain;
using awqaf.Dto;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using JHipsterNet.Core.Pagination;
using System;
using System.Collections.Generic;
namespace awqaf.Application.Queries
{
    public class SavedProvidersGetAllByUserIdOffersQueryHandler : IRequestHandler<SavedProvidersGetAllByUserIdOffersQuery, List<Offers>>
    {
        private IReadOnlySavedProvidersRepository _savedProvidersRepository;

        private IReadOnlyOffersRepository _offersRepository;
        public SavedProvidersGetAllByUserIdOffersQueryHandler(
            IReadOnlySavedProvidersRepository savedProvidersRepository, IReadOnlyOffersRepository offersRepository)
        {
            _savedProvidersRepository = savedProvidersRepository;
            _offersRepository = offersRepository;


        }

        public async Task<List<Offers>> Handle(SavedProvidersGetAllByUserIdOffersQuery request, CancellationToken cancellationToken)
        {

            //get all saved offers by user id 

            var page = await _savedProvidersRepository.QueryHelper().Filter(saved => saved.UserIdAwqaf == request.UserId).GetPageAsync(request.Page);

            //loop through all saved offers and get the provider id

            var savedOffers = new List<Offers>();

            foreach (var item in page.Content)
            {
                //check if OfferId id is not null
                if (item.OfferId != null && item.OfferId != "" && item.IsOffer == true)
                {

                    var entity = await _offersRepository.QueryHelper()
                      .GetOneAsync(offers => offers.Id == long.Parse(item.OfferId));

                    savedOffers.Add(entity);

                }
            }



            return savedOffers;
        }
    }
}
